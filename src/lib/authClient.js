import { createAuthClient } from '@neon/auth';
import { BetterAuthReactAdapter } from '@neon/auth/react/adapters';

// Public env is inlined at build time by Next (NEXT_PUBLIC_*).
const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;

export const authClient = authUrl
  ? createAuthClient(authUrl, { adapter: BetterAuthReactAdapter() })
  : null;

export const isAuthConfigured = Boolean(authUrl);
