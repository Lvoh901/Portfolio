import fs from 'node:fs';
import dotenv from 'dotenv';

// `neon deploy` writes the branch credentials here.
if (fs.existsSync('.env.local')) dotenv.config({ path: '.env.local' });
if (fs.existsSync('.env')) dotenv.config({ path: '.env' });

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const authBaseUrl = (process.env.NEON_AUTH_BASE_URL || '').replace(/\/$/, '');
const databaseUrl = required('DATABASE_URL');

export const env = {
  databaseUrl,
  databaseUrlDirect: process.env.DATABASE_URL_UNPOOLED || databaseUrl,
  authBaseUrl,
  // Managed Auth sets iss/aud to the origin of the auth URL
  authOrigin: authBaseUrl ? new URL(authBaseUrl).origin : '',
  authJwksUrl:
    process.env.NEON_AUTH_JWKS_URL ||
    (authBaseUrl ? `${authBaseUrl}/.well-known/jwks.json` : ''),
  realtimeUrl: process.env.NEON_REALTIME_URL || '',
  realtimeSecret: process.env.NEON_REALTIME_SECRET || '',
  storage: {
    endpoint: process.env.AWS_ENDPOINT_URL_S3 || '',
    region: process.env.AWS_REGION || 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  bucket: process.env.UPLOADS_BUCKET || 'uploads',
  adminEmails: (process.env.ADMIN_EMAILS || '')
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
