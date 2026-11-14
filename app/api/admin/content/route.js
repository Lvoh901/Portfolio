import { requireAdmin } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';
import {
  json,
  listProjects,
  listTestimonials,
  readStoredContent,
} from '../../../../server/repo.js';
import { defaultContent } from '../../../../src/data/defaultContent.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EDITABLE = new Set(['hero', 'about', 'contact', 'services', 'process', 'seo']);

export async function GET(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const stored = await readStoredContent();
  return json({
    content: { ...defaultContent, ...stored },
    projects: await listProjects(),
    testimonials: await listTestimonials(),
  });
}

export async function PUT(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const updates = body?.updates;
  if (!updates || typeof updates !== 'object') {
    return json({ error: 'Send { updates: { section: value } }.' }, 400);
  }

  const entries = Object.entries(updates).filter(([key]) => EDITABLE.has(key));
  if (entries.length === 0) {
    return json({ error: 'No editable sections were provided.' }, 400);
  }

  for (const [key, value] of entries) {
    await query(
      `insert into site_content (key, value, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [key, JSON.stringify(value)],
    );
  }

  return json({ ok: true, updated: entries.map(([key]) => key) });
}
