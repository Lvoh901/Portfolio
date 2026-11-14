'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-[70vh] items-center">
    <div className="mx-auto w-full max-w-6xl px-6 py-28 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Error 404</p>
      <h1 className="mt-5 max-w-2xl font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02]">
        This page walked off the map.
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
        The link may be outdated or the page may have moved. The work, services, and contact details
        are all still on the home page.
      </p>
      <Link
        href="/"
        className="group mt-9 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
