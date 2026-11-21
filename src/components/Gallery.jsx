"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const images = [
  "/designs/social_media1.png",
  "/designs/social_media2.png",
  "/designs/social_media3.png",
  "/designs/social_media4.jpg",
  "/designs/social_media5.jpg",
  "/designs/social_media6.jpg",
  "/designs/social_media7.jpg",
  "/designs/social_media8.jpg",
  "/designs/social_media9.jpg",
  "/designs/social_media10.png",
  "/designs/social_media11.webp",
  "/designs/social_media12.png",
  "/designs/social_media13.png",
  "/designs/social_media14.png",
  "/designs/social_media15.png",
  "/designs/social_media16.png",
];

const Gallery = () => (
  <div className="border-b border-line">
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8 lg:pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to portfolio
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-6 border-b border-line pb-10 lg:flex-row lg:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
            Design portfolio
          </p>
          <h1 className="max-w-2xl font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05]">
            Social media &amp; campaign design.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium">
            A selection of posts, campaign visuals, and brand pieces created for
            public and private accounts &mdash; built to stop the scroll without
            losing the message.
          </p>
        </div>
        <Link
          href="/#contact"
          className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-ink text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent"
        >
          Commission a design
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <a
            key={image}
            href={image}
            target="_blank"
            rel="noreferrer"
            className="gallery-tile group relative block overflow-hidden border border-line bg-paper-2"
          >
            <img
              src={image}
              alt={`Social media design ${index + 1}`}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center bg-accent opacity-0 transition-opacity group-hover:opacity-100">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </div>

      <Link
        href="/#contact"
        className="mt-8 flex flex-col items-center justify-between gap-4 border border-line bg-paper-2/50 px-6 py-8 text-center sm:flex-row sm:text-left"
      >
        <div>
          <p className="font-serif text-2xl">Need visuals for your brand?</p>
          <p className="text-[13px] font-medium">
            Identity, social templates, and campaign design &mdash; delivered as
            a usable kit.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink">
          Start a project
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  </div>
);

export default Gallery;
