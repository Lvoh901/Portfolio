import fs from 'node:fs';
import dotenv from 'dotenv';

// `neon deploy` writes the branch credentials here. Next.js also loads .env.local
// on its own; this keeps `node server/migrate.js` working the same way.
if (fs.existsSync('.env.local')) dotenv.config({ path: '.env.local' });
if (fs.existsSync('.env')) dotenv.config({ path: '.env' });

// Hosts and docker --env-file pass values verbatim, so a value pasted as
// "postgres://…" would keep its quotes. Strip a matching pair of quotes.
const read = (name) => {
  const value = (process.env[name] || '').trim();
  return /^(["'])[\s\S]*\1$/.test(value) ? value.slice(1, -1) : value;
};

const authBaseUrl = read('NEON_AUTH_BASE_URL').replace(/\/$/, '');

export const env = {
  databaseUrl: read('DATABASE_URL'),
  authBaseUrl,
  // Managed Auth sets iss/aud to the origin of the auth URL
  authOrigin: authBaseUrl ? new URL(authBaseUrl).origin : '',
  authJwksUrl: read('NEON_AUTH_JWKS_URL') || (authBaseUrl ? `${authBaseUrl}/.well-known/jwks.json` : ''),
  realtimeUrl: read('NEON_REALTIME_URL'),
  realtimeSecret: read('NEON_REALTIME_SECRET'),
  adminEmails: read('ADMIN_EMAILS')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
  nodeEnv: process.env.NODE_ENV || 'development',
};

export const databaseName = (() => {
  try {
    return new URL(env.databaseUrl).pathname.replace(/^\//, '') || 'neondb';
  } catch {
    return 'neondb';
  }
})();
