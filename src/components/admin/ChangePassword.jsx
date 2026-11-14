'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { authClient } from '../../lib/authClient';

const EMPTY = { current: '', next: '', confirm: '' };

const ChangePassword = () => {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [busy, setBusy] = useState(false);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;

    if (form.next.length < 8) {
      setStatus({ state: 'error', message: 'Use at least 8 characters.' });
      return;
    }
    if (form.next !== form.confirm) {
      setStatus({ state: 'error', message: 'The new passwords do not match.' });
      return;
    }
    if (form.next === form.current) {
      setStatus({ state: 'error', message: 'Choose a different password from the current one.' });
      return;
    }

    setBusy(true);
    setStatus({ state: 'saving', message: '' });
    try {
      await authClient.changePassword({
        currentPassword: form.current,
        newPassword: form.next,
        revokeOtherSessions: true,
      });
      setForm(EMPTY);
      setStatus({
        state: 'saved',
        message: 'Password updated. Any other signed-in devices were signed out.',
      });
    } catch (error) {
      const message = /invalid|incorrect/i.test(error?.message || '')
        ? 'That current password is not correct.'
        : error?.message || 'Could not change the password. Please try again.';
      setStatus({ state: 'error', message });
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

      {status.message && (
        <p
          role={status.state === 'error' ? 'alert' : undefined}
          className={`mt-4 border-l-2 px-3 py-2 text-[12px] ${
            status.state === 'error'
              ? 'border-red-500 bg-paper text-red-700'
              : 'border-accent bg-paper text-muted'
          }`}
        >
          {status.message}
        </p>
      )}

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
