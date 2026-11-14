import { createAuthClient } from '@neon/auth';
import { BetterAuthReactAdapter } from '@neon/auth/react/adapters';

// Served by the API at /runtime-config.js in production, so the same build
// works on any host; VITE_NEON_AUTH_URL covers `vite dev` (injected by `neon deploy`).
const authUrl = globalThis.__PORTFOLIO_ENV__?.authUrl || import.meta.env.VITE_NEON_AUTH_URL;

// Managed Better Auth lives on the Neon branch.
export const authClient = authUrl
  ? createAuthClient(authUrl, { adapter: BetterAuthReactAdapter() })
  : null;

export const isAuthConfigured = Boolean(authUrl);
