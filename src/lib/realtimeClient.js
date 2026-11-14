import { createRealtimeClient } from '@neon/realtime/client';

const url = process.env.NEXT_PUBLIC_NEON_REALTIME_URL;

// One client per browser app; every live subscription shares its connection.
export const realtimeClient = url ? createRealtimeClient({ url }) : null;

export const isRealtimeConfigured = Boolean(url);
