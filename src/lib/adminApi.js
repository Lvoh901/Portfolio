/**
 * Calls the dashboard API with a custom JWT stored in localStorage.
 * The server verifies the token against the `admin_users` table.
 */
export async function adminFetch(path, options = {}) {
  const token = localStorage.getItem('portfolio_token');
  if (!token) throw new Error('Not signed in.');

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
