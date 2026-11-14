import { createRemoteJWKSet, jwtVerify } from 'jose';
import { env } from './env.js';
import { query } from './db.js';

let jwks = null;

const getJwks = () => {
  if (!jwks) {
    if (!env.authJwksUrl) throw new Error('NEON_AUTH_JWKS_URL is not configured');
    jwks = createRemoteJWKSet(new URL(env.authJwksUrl));
  }
  return jwks;
};

export const verifyNeonToken = async (token) => {
  const { payload } = await jwtVerify(token, getJwks(), {
    algorithms: ['EdDSA'],
    issuer: env.authOrigin,
    audience: env.authOrigin,
  });
  return payload;
};

export const bearerFrom = (request) => {
  const header = request.headers.get('authorization') || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
};

/**
 * Administrators are rows in `admin_users` — seeded once by `npm run db:migrate`
 * and managed from Dashboard → Access. That table is the only source of truth.
 */
export const isAdminEmail = async (email) => {
  const { rows } = await query('select 1 from admin_users where email = $1 limit 1', [email]);
  return rows.length > 0;
};

export const listAdmins = async () => {
  const { rows } = await query(
    'select email, name from admin_users order by created_at asc, email asc',
  );
  return rows;
};

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/**
 * Verifies the Managed Better Auth JWT and requires the account to be a
 * database-backed administrator. Returns `{ admin }` or `{ response }`.
 */
export const requireAdmin = async (request) => {
  const token = bearerFrom(request);
  if (!token) return { response: json({ error: 'Sign in to continue.' }, 401) };

  let payload;
  try {
    payload = await verifyNeonToken(token);
  } catch (error) {
    const expired = error?.code === 'ERR_JWT_EXPIRED';
    return {
      response: json(
        { error: expired ? 'Your session expired. Please sign in again.' : 'Invalid session.' },
        401,
      ),
    };
  }

  const email = String(payload.email || '').toLowerCase();
  try {
    if (!email || !(await isAdminEmail(email))) {
      return {
        response: json({ error: `This account (${email || 'unknown'}) is not an administrator.` }, 403),
      };
    }
  } catch {
    return { response: json({ error: 'Could not check administrator access.' }, 500) };
  }

  return { admin: { id: payload.sub, email } };
};

export const adminJson = json;
