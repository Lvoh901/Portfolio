'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authClient, isAuthConfigured } from '../../lib/authClient';
import toast from '../../lib/toast';

const SignIn = ({ onSignedIn, notice }) => {
  const [mode, setMode] = useState('sign-in');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);

    try {
      const result =
        mode === 'sign-in'
          ? await authClient.signIn.email({ email: form.email, password: form.password })
          : await authClient.signUp.email({
              email: form.email,
              password: form.password,
              name: form.name || form.email.split('@')[0],
            });

      if (result?.error) {
        setError(result.error.message || 'That did not work. Check your details and try again.');
        return;
      }

      await onSignedIn();
    } catch (submitError) {
      setError(submitError?.message || 'Could not reach the auth server.');
      toast.error('Sign in failed', submitError?.message || 'Could not reach the auth server.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-lg leading-none text-ink">
            EO
          </span>
          <div>
            <p className="text-sm font-semibold">Portfolio dashboard</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Admin access</p>
          </div>
        </div>

        <div className="border border-line bg-paper-2/40 p-6 sm:p-8">
          <h1 className="font-serif text-3xl">
            {mode === 'sign-in' ? 'Sign in' : 'Create your account'}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {mode === 'sign-in'
              ? 'Use an email address with dashboard access.'
              : 'Register with your admin email, then sign in.'}
          </p>

          {notice && (
            <p className="mt-4 border-l-2 border-accent bg-paper px-3 py-2 text-[12px] text-muted">
              {notice}
            </p>
          )}

          {!isAuthConfigured && (
            <p className="mt-4 border-l-2 border-red-500 bg-paper px-3 py-2 text-[12px] text-red-700">
              NEXT_PUBLIC_NEON_AUTH_URL is not set. Run `neon deploy` to pull the auth URL into
              .env.local, then restart the dev server.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === 'sign-up' && (
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Name
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  autoComplete="name"
                  className="border border-line bg-paper px-4 py-3 text-[14px] focus:border-ink focus:outline-none"
                />
              </label>
            )}

            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                required
                autoComplete="email"
                className="border border-line bg-paper px-4 py-3 text-[14px] focus:border-ink focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={update}
                  required
                  minLength={8}
                  autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                  className="w-full border border-line bg-paper py-3 pl-4 pr-12 text-[14px] focus:border-ink focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {error && (
              <p role="alert" className="text-[12px] text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !isAuthConfigured}
              className="mt-1 bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in');
              setError('');
            }}
            className="mt-5 text-[12px] text-muted underline underline-offset-4 hover:text-ink"
          >
            {mode === 'sign-in' ? 'Need an account? Register' : 'Already registered? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
