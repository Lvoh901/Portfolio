"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  MoveUpRight,
} from "lucide-react";

const NotFound = () => {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[85vh] items-center overflow-hidden bg-paper">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-ink/[0.06]" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-ink/[0.06]" />
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-ink/[0.06]" />

        <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />

        <div className="absolute right-[12%] top-[25%] hidden lg:block">
          <div className="animate-[spin_24s_linear_infinite] text-ink/[0.06]">
            <Compass size={190} strokeWidth={0.5} />
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        {/* Main content */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
              Error 404 / Lost in navigation
            </p>
          </div>

          <div className="relative">
            <h1 className="font-serif text-[clamp(8rem,8vw,8rem)] leading-[0.78] tracking-[-0.09em] text-ink">
              404<span className="text-accent">.</span>
            </h1>
          </div>

          <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2.3rem,5vw,4rem)] leading-[1.05] tracking-tight text-ink">
            Looks like you've taken a wrong turn.
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-7 md:text-[15px]">
            The page you're looking for seems to have wandered off. It may have
            moved, been renamed, or no longer exists. Don't worry, there's still
            plenty to explore.
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-all duration-300 hover:bg-accent hover:text-ink"
            >
              <Home size={16} />
              Return home
              <MoveUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-accent cursor-pointer"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />
              Go back
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-16 flex items-center gap-3 border-t border-ink/10 pt-6">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              Good things are just a click away.
            </p>
          </div>
        </div>

        {/* Interactive visual */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div className="group relative flex h-[380px] w-[380px] items-center justify-center">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-ink/10 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-8 rounded-full border border-dashed border-ink/15 transition-transform duration-700 group-hover:rotate-12" />
            <div className="absolute inset-16 rounded-full border border-ink/10" />

            {/* Compass */}
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-ink/10 bg-paper shadow-[0_20px_70px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:shadow-[0_20px_90px_rgba(0,0,0,0.12)]">
              <Compass
                size={105}
                strokeWidth={0.7}
                className="text-accent transition-transform duration-700 group-hover:rotate-45"
              />
            </div>

            {/* Direction markers */}
            <span className="absolute left-1/2 top-3 -translate-x-1/2 text-sm font-bold">
              N
            </span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-bold">
              S
            </span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold">
              W
            </span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold">
              E
            </span>

            {/* Floating marker */}
            <div className="absolute -right-3 top-16 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-accent text-ink shadow-lg">
              <ArrowRight size={19} />
            </div>

            <p className="absolute -bottom-12 text-[10px] font-bold uppercase tracking-[0.25em] text-ink/40">
              Finding your way
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
