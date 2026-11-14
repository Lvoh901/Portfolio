import { query } from '../../../server/db.js';
import { json, text, trimToNull } from '../../../server/repo.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const recentByIp = new Map();
const allowSubmission = (ip) => {
  const now = Date.now();
  const windowStart = now - 60_000;
  const hits = (recentByIp.get(ip) || []).filter((time) => time > windowStart);
  if (hits.length >= 5) return false;
  hits.push(now);
  recentByIp.set(ip, hits);
  return true;
};

export async function POST(request) {
  const ip =
    (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!allowSubmission(ip)) {
    return json({ error: 'Too many messages. Please try again in a minute.' }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Send a JSON body.' }, 400);
  }

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const message = text(body.message, 5000);
  const company = text(body.company, 160);
  const projectType = text(body.projectType || body.project_type, 160);
  const projectId = trimToNull(body.projectId || body.project_id);
  const source = text(body.source, 40) || 'contact';

  if (!name || !email || !message) {
    return json({ error: 'Name, email and message are required.' }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  try {
    const { rows } = await query(
      `insert into inquiries (name, email, company, project_type, message, source, project_id)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning id, created_at, pg_current_xact_id()::text as txid`,
      [name, email, company, projectType, message, source, projectId],
    );

    return json({ ok: true, id: rows[0].id, createdAt: rows[0].created_at, txid: rows[0].txid }, 201);
  } catch (error) {
    console.error('[inquiries]', error.message);
    return json({ error: 'Could not save your message. Please email instead.' }, 500);
  }
}
