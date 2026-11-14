'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, UserPlus, X } from 'lucide-react';
import { adminFetch } from '../../lib/adminApi';
import toast from '../../lib/toast';
import ChangePassword from './ChangePassword';

const Access = () => {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState('');
  const [form, setForm] = useState({ email: '', name: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    adminFetch('/admin/users')
      .then((result) => {
        setUsers(result.users);
        setMe(result.me);
      })
      .catch((error) => toast.error('Could not load administrators', error.message));
  }, []);

  const add = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      const result = await adminFetch('/admin/users', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setUsers(result.users);
      setForm({ email: '', name: '' });
      toast.success('Administrator added', 'This address can sign in to the dashboard.');
    } catch (error) {
      toast.error('Could not add administrator', error.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (email) => {
    const confirmed = await toast.confirm(
      'Remove administrator?',
      `${email} will no longer be able to open the dashboard.`,
    );
    if (!confirmed) return;

    setBusy(true);
    try {
      const result = await adminFetch(`/admin/users/${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      setUsers(result.users);
      toast.success('Administrator removed', `${email} can no longer open the dashboard.`);
    } catch (error) {
      toast.error('Could not remove administrator', error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Access</p>
      <h1 className="mt-2 font-serif text-3xl">Dashboard administrators</h1>
      <p className="mt-2 max-w-xl text-[13px] text-muted">
        These accounts are stored in the <code className="bg-paper px-1">admin_users</code> table
        and can sign in at <code className="bg-paper px-1">/admin</code>. An address must register
        with Managed Auth before it can sign in.
      </p>

      <ul className="mt-6 max-w-xl divide-y divide-line border border-line bg-paper">
        {users.map((user) => (
          <li key={user.email} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-muted" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">{user.name || user.email}</p>
                <p className="truncate text-[12px] text-muted">{user.email}</p>
              </div>
            </div>
            {user.email === me ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                You
              </span>
            ) : (
              <button
                type="button"
                onClick={() => remove(user.email)}
                disabled={busy}
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-red-700 disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            )}
          </li>
        ))}
        {users.length === 0 && (
          <li className="px-5 py-4 text-[12px] text-muted">No administrators yet.</li>
        )}
      </ul>

      <form onSubmit={add} className="mt-8 max-w-xl border border-line bg-paper p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Add an administrator
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Email
            </span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="name@studio.com"
              className="border border-line bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Name
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Optional"
              className="border border-line bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-4 inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Add access
        </button>
      </form>

      <ChangePassword />
    </div>
  );
};

export default Access;
