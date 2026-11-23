"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  FolderKanban,
  Inbox as InboxIcon,
  LayoutTemplate,
  LogOut,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "../../lib/authClient";
import toast from "../../lib/toast";
import SignIn from "./SignIn";
import Inbox from "./Inbox";
import ContentEditor from "./ContentEditor";
import ProjectsAdmin from "./ProjectsAdmin";
import MediaAdmin from "./MediaAdmin";
import Access from "./Access";

const IDLE_LIMIT_MS = 15 * 60 * 1000;
const LAST_ACTIVE_KEY = "portfolio_last_active";
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

const tabs = [
  { id: "inbox", label: "Inbox", icon: <InboxIcon className="h-4 w-4" /> },
  {
    id: "content",
    label: "Content",
    icon: <LayoutTemplate className="h-4 w-4" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanban className="h-4 w-4" />,
  },
  { id: "media", label: "CV & files", icon: <FileText className="h-4 w-4" /> },
  { id: "access", label: "Access", icon: <ShieldCheck className="h-4 w-4" /> },
];

const AdminPage = () => {
  const [session, setSession] = useState({
    status: "loading",
    user: null,
    message: "",
  });
  const [tab, setTab] = useState("inbox");

  const checkSession = useCallback(async () => {
    try {
      const result = await authClient?.getSession();
      const user = result?.data?.user;
      if (!user) {
        setSession({ status: "signed-out", user: null, message: "" });
        return;
      }
      setSession({ status: "signed-in", user, message: "" });
    } catch {
      setSession({ status: "signed-out", user: null, message: "" });
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Sign the dashboard out after 15 minutes without any interaction.
  useEffect(() => {
    if (session.status !== "signed-in") return undefined;

    const lastActive = () => Number(localStorage.getItem(LAST_ACTIVE_KEY) || 0);
    let lastWrite = 0;

    const markActive = () => {
      const now = Date.now();
      if (now - lastWrite < 5000) return;
      lastWrite = now;
      localStorage.setItem(LAST_ACTIVE_KEY, String(now));
    };

    const expire = async () => {
      await authClient?.signOut();
      toast.success(
        "Session expired",
        "You were signed out after 15 minutes of inactivity.",
      );
      setSession({ status: "signed-out", user: null, message: "" });
    };

    const isIdle = () => {
      const last = lastActive();
      return last > 0 && Date.now() - last >= IDLE_LIMIT_MS;
    };

    if (isIdle()) {
      void expire();
      return undefined;
    }

    markActive();
    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, markActive, { passive: true }),
    );
    document.addEventListener("visibilitychange", markActive);

    const timer = window.setInterval(() => {
      if (isIdle()) void expire();
    }, 30000);

    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, markActive),
      );
      document.removeEventListener("visibilitychange", markActive);
      window.clearInterval(timer);
    };
  }, [session.status]);

  const signOut = async () => {
    await authClient?.signOut();
    toast.success("Signed out", "You have been logged out of the dashboard.");
    setSession({ status: "signed-out", user: null, message: "" });
  };

  if (session.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-sm text-muted">
        Checking your session…
      </div>
    );
  }

  if (session.status === "signed-out") {
    return <SignIn onSignedIn={checkSession} />;
  }

  if (session.status === "forbidden") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-5">
        <div className="w-full max-w-md border border-line bg-paper-2/40 p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Access denied
          </p>
          <h1 className="mt-3 font-serif text-3xl">Not an administrator</h1>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            {session.message}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
            Ask an existing administrator to add this address under{" "}
            <strong className="font-semibold">Access</strong> in the dashboard.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={signOut}
              className="bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper hover:bg-accent hover:text-ink"
            >
              Sign out
            </button>
            <Link
              href="/"
              className="text-[12px] text-muted underline underline-offset-4"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-lg leading-none text-ink">
              EO
            </span>
            <div>
              <p className="text-sm font-semibold">Admin Dashboard</p>
              <p className="text-[11px] font-medium italics">
                {session.user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-ink"
            >
              <ArrowUpLeft className="h-3.5 w-3.5" />
              View site
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 border-2 border-[#ff0000] px-3 py-2 text-[11px] text-[#ff0000] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink hover:text-ink cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 lg:px-8">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                tab === id
                  ? "border-accent text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        {tab === "inbox" && <Inbox />}
        {tab === "content" && <ContentEditor />}
        {tab === "projects" && <ProjectsAdmin />}
        {tab === "media" && <MediaAdmin />}
        {tab === "access" && <Access />}
      </main>
    </div>
  );
};

export default AdminPage;
