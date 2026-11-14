import express from 'express';
import multer from 'multer';
import { query } from './db.js';
import { listAdmins, requireAdmin } from './auth.js';
import { defaultContent } from '../src/data/defaultContent.js';
import { buildKey, deleteObject, objectUrl, uploadObject } from './storage.js';
import { getRealtime, inquiriesLiveQuery } from './realtime.js';

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const ALLOWED_UPLOAD_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
  'application/pdf',
]);

const text = (value, max = 2000) => String(value ?? '').trim().slice(0, max);

const trimToNull = (value) => {
  const trimmed = text(value);
  return trimmed === '' ? null : trimmed;
};

// ---------------------------------------------------------------- content ---

const readStoredContent = async () => {
  const { rows } = await query('select key, value from site_content');
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
};

const presentCv = async (cv) => {
  const value = cv && typeof cv === 'object' ? cv : defaultContent.cv;
  return {
    filename: value.filename || defaultContent.cv.filename,
    updatedAt: value.updatedAt || null,
    url: value.key ? await objectUrl(value.key) : value.url || defaultContent.cv.url,
  };
};

const listProjects = async () => {
  const { rows } = await query(
    `select id, slug, title, category, description, image_key, image_url, link_url, stage, sort_order, created_at
       from projects
      order by sort_order asc, created_at asc`,
  );

  return Promise.all(
    rows.map(async (row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      description: row.description,
      imageUrl: row.image_key ? await objectUrl(row.image_key) : row.image_url || '',
      linkUrl: row.link_url || '',
      stage: row.stage,
      sortOrder: row.sort_order,
    })),
  );
};

const listTestimonials = async () =>
  (
    await query(
      `select id, quote, author, role, sort_order from testimonials order by sort_order asc, author asc`,
    )
  ).rows;

router.get(
  '/content',
  asyncHandler(async (_req, res) => {
    const stored = await readStoredContent();
    const merged = { ...defaultContent, ...stored };
    res.set('Cache-Control', 'no-store');
    res.json({
      content: {
        ...merged,
        cv: await presentCv(merged.cv),
      },
      projects: await listProjects(),
      testimonials: await listTestimonials(),
    });
  }),
);

// -------------------------------------------------------------- inquiries ---

const recentByIp = new Map();
const allowSubmission = (ip) => {
  const now = Date.now();
  const windowStart = now - 60_000;
  const hits = (recentByIp.get(ip) || []).filter((time) => time > windowStart);
  if (hits.length >= 5) return false;
  hits.push(now);
  recentByIp.set(ip, hits);
  return true;
};

router.post(
  '/inquiries',
  asyncHandler(async (req, res) => {
    if (!allowSubmission(req.ip)) {
      return res.status(429).json({ error: 'Too many messages. Please try again in a minute.' });
    }

    const body = req.body || {};
    const name = text(body.name, 120);
    const email = text(body.email, 200);
    const message = text(body.message, 5000);
    const company = text(body.company, 160);
    const projectType = text(body.projectType || body.project_type, 160);
    const projectId = trimToNull(body.projectId || body.project_id);
    const source = text(body.source, 40) || 'contact';

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const { rows } = await query(
      `insert into inquiries (name, email, company, project_type, message, source, project_id)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning id, created_at, pg_current_xact_id()::text as txid`,
      [name, email, company, projectType, message, source, projectId],
    );

    res.status(201).json({ ok: true, id: rows[0].id, createdAt: rows[0].created_at, txid: rows[0].txid });
  }),
);

// ------------------------------------------------------------------ admin ---

router.get('/admin/session', requireAdmin, (req, res) => {
  res.json({ email: req.admin.email });
});

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

router.get(
  '/admin/users',
  requireAdmin,
  asyncHandler(async (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ users: await listAdmins(), me: req.admin.email });
  }),
);

router.post(
  '/admin/users',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const name = text(req.body?.name, 160);
    if (!isEmail(email)) return res.status(400).json({ error: 'Enter a valid email address.' });

    await query(
      `insert into admin_users (email, name)
       values ($1, $2)
       on conflict (email) do update
         set name = case when excluded.name = '' then admin_users.name else excluded.name end`,
      [email, name],
    );

    res.status(201).json({ ok: true, users: await listAdmins() });
  }),
);

router.delete(
  '/admin/users/:email',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const email = String(req.params.email || '').trim().toLowerCase();
    if (email === req.admin.email) {
      return res.status(400).json({ error: 'You cannot remove your own access.' });
    }

    // One statement keeps the "never lock everyone out" rule atomic: the delete
    // only happens while another administrator exists.
    const { rowCount } = await query(
      'delete from admin_users where email = $1 and (select count(*) from admin_users) > 1',
      [email],
    );

    if (rowCount === 0) {
      const { rowCount: exists } = await query('select 1 from admin_users where email = $1', [email]);
      return exists
        ? res.status(400).json({ error: 'At least one administrator must keep access.' })
        : res.status(404).json({ error: 'That address is not on the access list.' });
    }

    res.json({ ok: true, users: await listAdmins() });
  }),
);

router.get(
  '/admin/content',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const stored = await readStoredContent();
    res.set('Cache-Control', 'no-store');
    res.json({
      content: { ...defaultContent, ...stored },
      projects: await listProjects(),
      testimonials: await listTestimonials(),
    });
  }),
);

router.put(
  '/admin/content',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const updates = req.body?.updates;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Send { updates: { section: value } }.' });
    }

    const allowed = new Set(['hero', 'about', 'contact', 'services', 'process', 'seo']);
    const entries = Object.entries(updates).filter(([key]) => allowed.has(key));
    if (entries.length === 0) {
      return res.status(400).json({ error: 'No editable sections were provided.' });
    }

    for (const [key, value] of entries) {
      await query(
        `insert into site_content (key, value, updated_at)
         values ($1, $2::jsonb, now())
         on conflict (key) do update set value = excluded.value, updated_at = now()`,
        [key, JSON.stringify(value)],
      );
    }

    res.json({ ok: true, updated: entries.map(([key]) => key) });
  }),
);

router.put(
  '/admin/testimonials',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const items = Array.isArray(req.body?.items) ? req.body.items : null;
    if (!items) return res.status(400).json({ error: 'Send { items: [...] }.' });

    const cleaned = items
      .map((item) => ({
        quote: text(item.quote, 1200),
        author: text(item.author, 160),
        role: text(item.role, 160),
      }))
      .filter((item) => item.quote && item.author);

    await query('delete from testimonials');
    let order = 0;
    for (const item of cleaned) {
      await query(
        'insert into testimonials (quote, author, role, sort_order) values ($1, $2, $3, $4)',
        [item.quote, item.author, item.role, order++],
      );
    }

    res.json({ ok: true, items: await listTestimonials() });
  }),
);

router.post(
  '/admin/projects',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const body = req.body || {};
    const title = text(body.title, 160);
    if (!title) return res.status(400).json({ error: 'A project title is required.' });

    const { rows } = await query(
      `insert into projects (title, category, description, link_url, stage, image_key, image_url, sort_order)
       values ($1, $2, $3, $4, $5, $6, $7, coalesce((select max(sort_order) + 1 from projects), 0))
       returning id`,
      [
        title,
        text(body.category, 120),
        text(body.description, 800),
        text(body.linkUrl, 500),
        body.stage === 'launched' ? 'launched' : 'in-progress',
        body.imageKey || null,
        body.imageUrl || null,
      ],
    );

    res.status(201).json({ ok: true, id: rows[0].id });
  }),
);

router.put(
  '/admin/projects/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const body = req.body || {};
    // an empty string clears the stored value; undefined leaves it untouched
    const clearImageKey = body.imageKey === '';
    const imageKey = body.imageKey ? body.imageKey : null;
    const clearImageUrl = body.imageUrl === '';
    const imageUrl = body.imageUrl ? body.imageUrl : null;
    const { rows } = await query(
      `update projects set
         title = coalesce($2, title),
         category = coalesce($3, category),
         description = coalesce($4, description),
         link_url = coalesce($5, link_url),
         stage = coalesce($6, stage),
         image_key = case when $7 then null else coalesce($8, image_key) end,
         image_url = case when $9 then null else coalesce($10, image_url) end,
         sort_order = coalesce($11, sort_order),
         updated_at = now()
       where id = $1
       returning id`,
      [
        req.params.id,
        body.title === undefined ? null : text(body.title, 160),
        body.category === undefined ? null : text(body.category, 120),
        body.description === undefined ? null : text(body.description, 800),
        body.linkUrl === undefined ? null : text(body.linkUrl, 500),
        body.stage === undefined ? null : body.stage === 'launched' ? 'launched' : 'in-progress',
        clearImageKey,
        imageKey,
        clearImageUrl,
        imageUrl,
        Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : null,
      ],
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Project not found.' });
    res.json({ ok: true });
  }),
);

router.delete(
  '/admin/projects/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { rows } = await query('delete from projects where id = $1 returning image_key', [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found.' });
    if (rows[0].image_key) {
      await deleteObject(rows[0].image_key).catch(() => {});
    }
    res.json({ ok: true });
  }),
);

router.get(
  '/admin/inquiries',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const { rows } = await query(
      `select i.id, i.name, i.email, i.company, i.project_type, i.message, i.status,
              i.source, i.created_at, i.project_id, p.title as project_title
         from inquiries i
         left join projects p on p.id = i.project_id
        order by i.created_at desc
        limit 200`,
    );
    res.set('Cache-Control', 'no-store');
    res.json({ inquiries: rows });
  }),
);

router.get(
  '/admin/inquiries/live',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const sealed = await getRealtime().seal({ query: inquiriesLiveQuery() });
    res.set('Cache-Control', 'no-store');
    res.json(sealed);
  }),
);

router.patch(
  '/admin/inquiries/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const status = ['new', 'read', 'archived'].includes(req.body?.status) ? req.body.status : null;
    if (!status) return res.status(400).json({ error: 'Status must be new, read or archived.' });

    const { rows } = await query(
      'update inquiries set status = $2 where id = $1 returning id, status',
      [req.params.id, status],
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json({ ok: true, status: rows[0].status });
  }),
);

router.delete(
  '/admin/inquiries/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { rowCount } = await query('delete from inquiries where id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json({ ok: true });
  }),
);

router.post(
  '/admin/upload',
  requireAdmin,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file received.' });
    if (!ALLOWED_UPLOAD_TYPES.has(req.file.mimetype)) {
      return res.status(415).json({ error: 'Upload a PNG, JPEG, WebP, GIF or PDF file.' });
    }

    const folder = text(req.query.folder, 40) || 'projects';
    const key = buildKey(folder, req.file.originalname || 'upload');
    await uploadObject({ key, body: req.file.buffer, contentType: req.file.mimetype });

    res.status(201).json({ ok: true, key, url: await objectUrl(key), size: req.file.size });
  }),
);

router.post(
  '/admin/cv',
  requireAdmin,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file received.' });
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(415).json({ error: 'The CV must be a PDF.' });
    }

    const previous = (await readStoredContent()).cv;
    const key = buildKey('cv', req.file.originalname || 'cv.pdf');
    await uploadObject({ key, body: req.file.buffer, contentType: 'application/pdf' });

    const value = {
      key,
      filename: text(req.file.originalname, 200) || 'cv.pdf',
      updatedAt: new Date().toISOString(),
    };

    await query(
      `insert into site_content (key, value, updated_at)
       values ('cv', $1::jsonb, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [JSON.stringify(value)],
    );

    if (previous?.key && previous.key !== key) {
      await deleteObject(previous.key).catch(() => {});
    }

    res.status(201).json({ ok: true, cv: await presentCv(value) });
  }),
);

export default router;
