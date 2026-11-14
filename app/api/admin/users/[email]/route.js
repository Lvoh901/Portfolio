import { listAdmins, requireAdmin } from '../../../../../server/auth.js';
import { query } from '../../../../../server/db.js';
import { json } from '../../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const { email: raw } = await params;
  const email = String(raw || '').trim().toLowerCase();

  if (email === admin.email) {
    return json({ error: 'You cannot remove your own access.' }, 400);
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
      ? json({ error: 'At least one administrator must keep access.' }, 400)
      : json({ error: 'That address is not on the access list.' }, 404);
  }

  return json({ ok: true, users: await listAdmins() });
}
