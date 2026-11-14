import { requireAdmin } from '../../../../../server/auth.js';
import { getRealtime, inquiriesLiveQuery } from '../../../../../server/realtime.js';
import { json } from '../../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  const sealed = await getRealtime().seal({ query: inquiriesLiveQuery() });
  return json(sealed);
}
