const API_BASE = '/api/auth';

export const authClient = {
  async signIn({ email, password }) {
    const res = await fetch(`${API_BASE}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: { message: data.error || 'Sign in failed' } };
    localStorage.setItem('portfolio_token', data.token);
    localStorage.setItem('portfolio_last_active', String(Date.now()));
    return { data: { user: data.user } };
  },

  async signUp({ email, password, name }) {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (!res.ok) return { error: { message: data.error || 'Sign up failed' } };
    localStorage.setItem('portfolio_token', data.token);
    localStorage.setItem('portfolio_last_active', String(Date.now()));
    return { data: { user: data.user } };
  },

  async signOut() {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_last_active');
  },

  async getSession() {
    const token = localStorage.getItem('portfolio_token');
    if (!token) return { data: { user: null } };
    try {
      const res = await fetch(`${API_BASE}/session`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem('portfolio_token');
        return { data: { user: null } };
      }
      const data = await res.json();
      return { data: { user: data.user } };
    } catch {
      return { data: { user: null } };
    }
  },

  async changePassword({ currentPassword, newPassword }) {
    // Custom auth has no revokeOtherSessions support; it only changes the password.
    const token = localStorage.getItem('portfolio_token');
    const res = await fetch(`${API_BASE}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { error: { message: data.error || 'Password change failed' } };
    }
    return { data: {} };
  },
};

export const isAuthConfigured = true;
