import { requireAdmin } from '../../../../server/auth.js';
import { json } from '../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;
  return json({ email: admin.email });
}
