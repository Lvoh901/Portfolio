import fs from 'node:fs';
import dotenv from 'dotenv';

// `neon deploy` writes the branch credentials here.
if (fs.existsSync('.env.local')) dotenv.config({ path: '.env.local' });
if (fs.existsSync('.env')) dotenv.config({ path: '.env' });

// Hosts and docker --env-file pass values verbatim, so a value pasted as
// "postgres://…" would keep its quotes. Strip a matching pair of quotes.
const read = (name) => {
  const value = (process.env[name] || '').trim();
  return /^(["'])[\s\S]*\1$/.test(value) ? value.slice(1, -1) : value;
};

const required = (name) => {
  const value = read(name);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const authBaseUrl = read('NEON_AUTH_BASE_URL').replace(/\/$/, '');
const databaseUrl = required('DATABASE_URL');

export const env = {
  databaseUrl,
  databaseUrlDirect: read('DATABASE_URL_UNPOOLED') || databaseUrl,
  authBaseUrl,
  // Managed Auth sets iss/aud to the origin of the auth URL
  authOrigin: authBaseUrl ? new URL(authBaseUrl).origin : '',
  authJwksUrl: read('NEON_AUTH_JWKS_URL') || (authBaseUrl ? `${authBaseUrl}/.well-known/jwks.json` : ''),
  realtimeUrl: read('NEON_REALTIME_URL'),
  realtimeSecret: read('NEON_REALTIME_SECRET'),
  storage: {
    endpoint: read('AWS_ENDPOINT_URL_S3'),
    region: read('AWS_REGION') || 'us-east-2',
    accessKeyId: read('AWS_ACCESS_KEY_ID'),
    secretAccessKey: read('AWS_SECRET_ACCESS_KEY'),
  },
  bucket: read('UPLOADS_BUCKET') || 'uploads',
  adminEmails: read('ADMIN_EMAILS')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
  // some shells export PORT=0; fall back to the dev port in that case
  port: Number(process.env.PORT) > 0 ? Number(process.env.PORT) : 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export const databaseName = (() => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '') || 'neondb';
  } catch {
    return 'neondb';
  }
})();
