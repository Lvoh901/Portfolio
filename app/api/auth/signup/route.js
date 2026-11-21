import { NextResponse } from 'next/server';
import { query } from '../../../../server/db.js';
import { hashPassword, createToken } from '../../../../server/auth.js';

export async function POST(request) {
  try {
    const { email, name, password, role = 'admin' } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const { rows } = await query('select 1 from admin_users where email = $1 limit 1', [normalizedEmail]);
    if (rows.length > 0) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }
    const hashed = await hashPassword(password);
    await query(
      `insert into admin_users (email, name, role, password_hash)
       values ($1, $2, $3, $4)`,
      [normalizedEmail, name || '', role, hashed],
    );
    const token = createToken({ sub: normalizedEmail, email: normalizedEmail, role });
    return NextResponse.json({
      ok: true,
      token,
      user: { email: normalizedEmail, name: name || '', role },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Sign up failed' }, { status: 500 });
  }
}
