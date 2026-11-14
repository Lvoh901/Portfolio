import { requireAdmin } from '../../../../../server/auth.js';
import { query } from '../../../../../server/db.js';
import { json } from '../../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const status = ['new', 'read', 'archived'].includes(body?.status) ? body.status : null;
  if (!status) return json({ error: 'Status must be new, read or archived.' }, 400);

  const { rows } = await query('update inquiries set status = $2 where id = $1 returning id, status', [
    id,
    status,
  ]);
  if (rows.length === 0) return json({ error: 'Inquiry not found.' }, 404);

  return json({ ok: true, status: rows[0].status });
}

export async function DELETE(request, { params }) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const { id } = await params;
  const { rowCount } = await query('delete from inquiries where id = $1', [id]);
  if (rowCount === 0) return json({ error: 'Inquiry not found.' }, 404);

  return json({ ok: true });
}
