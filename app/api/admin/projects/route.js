import { requireAdmin } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';
import { json, text } from '../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const title = text(body.title, 160);
  if (!title) return json({ error: 'A project title is required.' }, 400);

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

  return json({ ok: true, id: rows[0].id }, 201);
}
