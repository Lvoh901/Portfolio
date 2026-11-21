"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "../../lib/authClient";
import toast from "../../lib/toast";
import Link from "next/link";

const SignIn = ({ onSignedIn, notice }) => {
  const [mode, setMode] = useState("sign-in");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const result =
        mode === "sign-in"
          ? await authClient.signIn({
              email: form.email,
              password: form.password,
            })
          : await authClient.signUp({
              email: form.email,
              password: form.password,
              name: form.name || form.email.split("@")[0],
            });

      if (result?.error) {
        const message =
          result.error.message ||
          "That did not work. Check your details and try again.";
        setError(message);
        toast.error("Sign in failed", message);
        return;
      }

      await onSignedIn();
    } catch (submitError) {
      const message =
        submitError?.message || "Could not reach the auth server.";
      setError(message);
      toast.error("Sign in failed", message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5 py-8">
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center gap-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center bg-accent font-serif text-xl leading-none text-ink hover:rounded-full"
          >
            EO
          </Link>
          <div>
            <p className="text-sm font-bold uppercase">Portfolio dashboard</p>
            <p className="text-[10px] uppercase tracking-[0.18em] font-medium">
              Admin access
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-paper-2/40 p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl">
              {mode === "sign-in" ? "Sign in" : "Create your account"}
            </h1>
            <p className="text-[14px] leading-relaxed">
              {mode === "sign-in"
                ? "Use an email address with dashboard access."
                : "Register with your admin email, then sign in."}
            </p>
          </div>

          {notice && (
            <p className="mt-6 border-l-2 border-accent bg-paper px-3 py-2 text-[12px] text-muted">
              {notice}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {mode === "sign-up" && (
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Name
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  autoComplete="name"
                  placeholder="Elvis Odhiambo"
                  className="w-full border border-line bg-paper px-4 py-3 text-[14px] focus:border-ink focus:outline-none"
                />
              </label>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                required
                autoComplete="email"
                placeholder="elvis@studio.com"
                className="w-full border border-line bg-paper px-4 py-3 text-[14px] focus:border-ink focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={update}
                  required
                  minLength={8}
                  autoComplete={
                    mode === "sign-in" ? "current-password" : "new-password"
                  }
                  placeholder="••••••••"
                  className="w-full border border-line bg-paper py-3 pl-4 pr-10 text-[14px] focus:border-ink focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted transition-colors hover:text-ink"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
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
              disabled={busy}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
            >
              {busy
                ? "Please wait…"
                : mode === "sign-in"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "sign-in" ? "sign-up" : "sign-in");
              setError("");
              setShowPassword(false);
            }}
            className="mt-6 inline-flex items-center gap-1.5 text-[12px] underline underline-offset-4 hover:text-ink"
          >
            {mode === "sign-in"
              ? "Need an account? Register"
              : "Already registered? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
