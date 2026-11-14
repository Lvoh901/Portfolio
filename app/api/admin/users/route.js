import { listAdmins, requireAdmin } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';
import { json, text } from '../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function GET(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;
  return json({ users: await listAdmins(), me: admin.email });
}

export async function POST(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const email = String(body?.email || '').trim().toLowerCase();
  const name = text(body?.name, 160);
  if (!isEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);

  await query(
    `insert into admin_users (email, name)
     values ($1, $2)
     on conflict (email) do update
       set name = case when excluded.name = '' then admin_users.name else excluded.name end`,
    [email, name],
  );

  return json({ ok: true, users: await listAdmins() }, 201);
}
