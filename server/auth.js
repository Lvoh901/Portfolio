import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db.js';

const JWT_SECRET = process.env.AUTH_JWT_SECRET || 'change-me-in-production';

export const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const verifyPassword = async (plain, hash) => bcrypt.compare(plain, hash);

export const hashPassword = (plain) => bcrypt.hash(plain, 10);

/**
 * Administrators are rows in `admin_users` — seeded once by `npm run db:migrate`
 * and managed from Dashboard → Access. Passwords are hashed with bcrypt and
 * stored in `admin_users.password_hash`.
 */
export const isAdminEmail = async (email) => {
  const { rows } = await query('select 1 from admin_users where email = $1 limit 1', [email]);
  return rows.length > 0;
};

export const listAdmins = async () => {
  const { rows } = await query(
    'select email, name, role from admin_users order by created_at asc, email asc',
  );
  return rows;
};

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/**
 * Verifies the custom JWT and requires the account to be a database-backed
 * administrator. Every admin route is gated by this.
 */
export const requireAdmin = async (request) => {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) return { response: json({ error: 'Sign in to continue.' }, 401) };

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return { response: json({ error: 'Invalid or expired session.' }, 401) };
  }

  const email = String(payload.email || '').toLowerCase();
  const { rows } = await query('select 1 from admin_users where email = $1 limit 1', [email]);
  if (rows.length === 0) {
    return { response: json({ error: `This account (${email || 'unknown'}) is not an administrator.` }, 403) };
  }

  return { admin: { id: payload.sub, email } };
};

export const adminJson = json;
