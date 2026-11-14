import { json, publicContent } from '../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return json(await publicContent());
  } catch (error) {
    console.error('[content]', error.message);
    return json({ error: 'Content is unavailable right now.' }, 500);
  }
}
