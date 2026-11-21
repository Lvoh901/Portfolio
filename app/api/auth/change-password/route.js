import { NextResponse } from 'next/server';
import { query } from '../../../../server/db.js';
import { verifyPassword, hashPassword } from '../../../../server/auth.js';
import { verifyToken } from '../../../../server/auth.js';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!token) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    }

    const payload = verifyToken(token);
    const { rows } = await query(
      'select email, password_hash from admin_users where email = $1 limit 1',
      [payload.email],
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const user = rows[0];
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current and new password required.' }, { status: 400 });
    }

    const match = await verifyPassword(currentPassword, user.password_hash);
    if (!match) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
    }

    const hashed = await hashPassword(newPassword);
    await query('update admin_users set password_hash = $2 where email = $1', [
      user.email,
      hashed,
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Password change failed' }, { status: 500 });
  }
}
