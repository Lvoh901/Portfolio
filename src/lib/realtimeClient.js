import { createRealtimeClient } from '@neon/realtime/client';

// /runtime-config.js in production, VITE_NEON_REALTIME_URL in `vite dev`.
const url = globalThis.__PORTFOLIO_ENV__?.realtimeUrl || import.meta.env.VITE_NEON_REALTIME_URL;

// One client per browser app; every live subscription shares its connection.
export const realtimeClient = url ? createRealtimeClient({ url }) : null;

export const isRealtimeConfigured = Boolean(url);
