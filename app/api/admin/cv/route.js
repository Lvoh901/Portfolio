import { UTApi } from 'uploadthing/server';
import { requireAdmin } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';
import { json, presentCv, readStoredContent, text } from '../../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const utapi = new UTApi();

export async function POST(request) {
  const { admin, response } = await requireAdmin(request);
  if (!admin) return response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const url = text(body?.url, 600);
  const key = text(body?.key, 300);
  const filename = text(body?.filename, 200) || 'cv.pdf';

  if (!/^https:\/\//.test(url)) {
    return json({ error: 'Upload the CV first, then send its URL.' }, 400);
  }

  const previous = (await readStoredContent()).cv;
  const value = { url, key: key || null, filename, updatedAt: new Date().toISOString() };

  await query(
    `insert into site_content (key, value, updated_at)
     values ('cv', $1::jsonb, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [JSON.stringify(value)],
  );

  if (previous?.key && previous.key !== value.key) {
    await utapi.deleteFiles(previous.key).catch(() => {});
  }

  return json({ ok: true, cv: presentCv(value) }, 201);
}
