import { UTApi } from 'uploadthing/server';
import { requireAdmin } from '../../../../../server/auth.js';
import { query } from '../../../../../server/db.js';
import { json, text } from '../../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const utapi = new UTApi();

export async function PUT(request, { params }) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

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
      id,
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

  if (rows.length === 0) return json({ error: 'Project not found.' }, 404);
  return json({ ok: true });
}

export async function DELETE(request, { params }) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const { id } = await params;
  const { rows } = await query('delete from projects where id = $1 returning image_key', [id]);
  if (rows.length === 0) return json({ error: 'Project not found.' }, 404);

  if (rows[0].image_key) {
    await utapi.deleteFiles(rows[0].image_key).catch(() => {});
  }

  return json({ ok: true });
}
