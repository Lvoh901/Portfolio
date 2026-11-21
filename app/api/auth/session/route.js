import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../server/auth.js';
import { query } from '../../../../server/db.js';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!token) {
      return NextResponse.json({ error: 'No session.' }, { status: 401 });
    }
    const payload = verifyToken(token);
    const { rows } = await query(
      'select email, name, role from admin_users where email = $1 limit 1',
      [payload.email],
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not an administrator.' }, { status: 403 });
    }
    return NextResponse.json({ ok: true, user: rows[0] });
  } catch {
    return NextResponse.json({ error: 'Invalid session.' }, { status: 401 });
  }
}
