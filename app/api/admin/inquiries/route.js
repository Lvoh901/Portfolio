import { requireAdmin } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';
import { json } from '../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const { rows } = await query(
    `select i.id, i.name, i.email, i.company, i.project_type, i.message, i.status,
            i.source, i.created_at, i.project_id, p.title as project_title
       from inquiries i
       left join projects p on p.id = i.project_id
      order by i.created_at desc
      limit 200`,
  );

  return json({ inquiries: rows });
}
