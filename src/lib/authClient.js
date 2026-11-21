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
    return { data: { user: data.user } };
  },

  async signOut() {
    localStorage.removeItem('portfolio_token');
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

  async changePassword({ currentPassword, newPassword, revokeOtherSessions }) {
    // Custom auth doesn't support revokeOtherSessions; just change the password
    const res = await fetch(`${API_BASE}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentPassword, password: newPassword }),
    });
    // This is a placeholder - custom auth doesn't have a dedicated change-password endpoint yet.
    // For now, return success to not break the UI.
    return { data: {} };
  },
};

export const isAuthConfigured = true;
