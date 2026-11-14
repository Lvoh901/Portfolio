import { authClient } from './authClient';

/**
 * Managed Auth returns the signed JWT on the session (`data.session.token`),
 * refreshed by getSession() before its 15 minute expiry.
 */
export async function adminToken() {
  if (!authClient) throw new Error('Auth is not configured (NEXT_PUBLIC_NEON_AUTH_URL is missing).');

  const session = await authClient.getSession();
  let token = session?.data?.session?.token ?? null;

  if (!token && typeof authClient.getJWTToken === 'function') {
    token = await authClient.getJWTToken();
  }

  if (!token || token.split('.').length !== 3) {
    throw new Error('Your session expired. Please sign in again.');
  }

  return token;
}

/**
 * Calls the dashboard API with a short-lived Managed Auth JWT.
 * The server verifies the token against Neon's JWKS and the `admin_users` table.
 */
export async function adminFetch(path, options = {}) {
  const token = await adminToken();

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);

  const isFormData = options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`/api${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status})`);
  }
  return payload;
}

export const publicFetch = async (path, options) => {
  const response = await fetch(`/api${path}`, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
};
