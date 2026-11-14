import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

let poolInstance = null;

const pool = () => {
  if (!poolInstance) {
    if (!env.databaseUrl) throw new Error('DATABASE_URL is not configured');
    poolInstance = new Pool({
      connectionString: env.databaseUrl,
      max: Number(process.env.PG_POOL_MAX || 5),
      idleTimeoutMillis: 30_000,
      ssl: env.databaseUrl.includes('localhost') ? undefined : { rejectUnauthorized: false },
    });
    poolInstance.on('error', (error) => console.error('[db] idle client error', error.message));
  }
  return poolInstance;
};

export const query = (text, params) => pool().query(text, params);

export const transaction = async (fn) => {
  const client = await pool().connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const closePool = async () => {
  if (!poolInstance) return;
  const active = poolInstance;
  poolInstance = null;
  await active.end();
};
