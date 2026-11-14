import { requireAdmin } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';
import { json, listTestimonials, text } from '../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const items = Array.isArray(body?.items) ? body.items : null;
  if (!items) return json({ error: 'Send { items: [...] }.' }, 400);

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

  return json({ ok: true, items: await listTestimonials() });
}
