import { createRealtime, rawSql } from '@neon/realtime/server';
import { env, databaseName } from './env.js';

let realtime = null;

export const getRealtime = () => {
  if (!realtime) {
    if (!env.realtimeSecret) throw new Error('NEON_REALTIME_SECRET is not configured');
    realtime = createRealtime({
      secret: env.realtimeSecret,
      db: databaseName,
      url: env.realtimeUrl || undefined,
      debugMode: env.nodeEnv !== 'production',
    });
  }
  return realtime;
};

export const INQUIRY_COLUMNS = `
  i.id,
  i.name,
  i.email,
  i.company,
  i.project_type,
  i.message,
  i.status,
  i.source,
  i.created_at,
  i.project_id,
  p.title as project_title
`;

/**
 * One read-only query covering the dashboard inbox. Realtime rejects row-level
 * security, so authorization happens here: only an authenticated admin ever
 * receives this sealed query.
 */
export const inquiriesLiveQuery = () =>
  rawSql(
    `SELECT ${INQUIRY_COLUMNS}
       FROM inquiries i
       LEFT JOIN projects p ON p.id = i.project_id
      ORDER BY i.created_at DESC
      LIMIT 200`,
    [],
  );
