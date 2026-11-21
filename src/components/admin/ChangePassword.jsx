'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { publicFetch } from '../../lib/adminApi';
import toast from '../../lib/toast';

const EMPTY = { current: '', next: '', confirm: '' };

const ChangePassword = () => {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;

    if (form.next.length < 8) {
      toast.error('Password too short', 'Use at least 8 characters.');
      return;
    }
    if (form.next !== form.confirm) {
      toast.error('Passwords do not match', 'The new passwords do not match.');
      return;
    }
    if (form.next === form.current) {
      toast.error('Same password', 'Choose a different password from the current one.');
      return;
    }

    setBusy(true);
    toast.loading('Updating password…');
    try {
      const res = await publicFetch('/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.current,
          newPassword: form.next,
        }),
      });
      setForm(EMPTY);
      toast.close();
      toast.success('Password updated', 'Any other signed-in devices were signed out.');
    } catch (error) {
      toast.close();
      const message = /invalid|incorrect/i.test(error?.message || '')
        ? 'That current password is not correct.'
        : error?.message || 'Could not change the password. Please try again.';
      toast.error('Password change failed', message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 max-w-xl border border-line bg-paper p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
        Your login
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-muted">
        Change the password for the account you are signed in with. Other sessions are signed out.
      </p>

      <div className="mt-4 grid gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Current password
          </span>
          <input
            type="password"
            name="current-password"
            required
            autoComplete="current-password"
            value={form.current}
            onChange={update('current')}
            className="border border-line bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              New password
            </span>
            <input
              type="password"
              name="new-password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.next}
              onChange={update('next')}
              className="border border-line bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Repeat new password
            </span>
            <input
              type="password"
              name="confirm-password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.confirm}
              onChange={update('confirm')}
              className="border border-line bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-4 inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        <KeyRound className="h-3.5 w-3.5" />
        {busy ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
};

export default ChangePassword;
