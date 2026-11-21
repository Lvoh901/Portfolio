import { NextResponse } from 'next/server';
import { query } from '../../../../server/db.js';
import { verifyPassword, createToken } from '../../../../server/auth.js';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const { rows } = await query(
      'select email, name, role, password_hash from admin_users where email = $1 limit 1',
      [normalizedEmail],
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    const user = rows[0];
    if (!user.password_hash) {
      return NextResponse.json({ error: 'No password set for this account.' }, { status: 401 });
    }
    const match = await verifyPassword(password, user.password_hash);
    if (!match) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    const token = createToken({ sub: user.email, email: user.email, role: user.role });
    return NextResponse.json({
      ok: true,
      token,
      user: { email: user.email, name: user.name || '', role: user.role },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Sign in failed' }, { status: 500 });
  }
}
