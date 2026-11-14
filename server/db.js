import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

// The pooled connection string is the right one for application traffic.
export const pool = new Pool({
  connectionString: env.databaseUrl,
  max: Number(process.env.PG_POOL_MAX || 5),
  idleTimeoutMillis: 30_000,
  ssl: env.databaseUrl.includes('localhost') ? undefined : { rejectUnauthorized: false },
});

pool.on('error', (error) => {
  console.error('[db] idle client error', error.message);
});

export const query = (text, params) => pool.query(text, params);

export const transaction = async (fn) => {
  const client = await pool.connect();
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
