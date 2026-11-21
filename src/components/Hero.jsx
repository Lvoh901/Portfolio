"use client";

import Image from "next/image";
import { ArrowDownRight, Download } from "lucide-react";
import { useContent } from "../contexts/ContentContext";

const Hero = () => {
  const { content } = useContent();
  const { hero, cv, contact } = content;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-line/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-line/80"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <div className="reveal flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                {hero.badge}
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-muted sm:block">
                {hero.location}
              </span>
            </div>

            <h1
              className="reveal mt-7 font-serif text-[clamp(2.6rem,5.6vw,4.35rem)] leading-[1.03] tracking-[-0.02em]"
              style={{ animationDelay: "0.08s" }}
            >
              {hero.headline}
              <span className="italic text-ink-soft">{hero.accentLine}</span>
            </h1>

            <p
              className="reveal mt-7 max-w-xl text-[1.0625rem] leading-relaxed font-medium"
              style={{ animationDelay: "0.16s" }}
            >
              {hero.subheadline}
            </p>

            <div
              className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.24s" }}
            >
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink"
              >
                View selected work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={cv?.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 border border-line px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>

            {/*
              TODO: Replace these text badges with real client logo SVGs/images.
              For now, stylised initials act as placeholder logo marks.
            */}
            <section
              id="trusted"
              className="reveal mt-10 flex flex-col gap-x-6 gap-y-4 border-t border-line pt-8 lg:pt-14 lg:flex-nowrap lg:justify-start lg:gap-x-12"
              style={{ animationDelay: "0.32s" }}
            >
              <span className="text-[15px] font-serif font-semibold uppercase tracking-[0.18em] underline underline-offset-4 decoration-accent decoration-2 whitespace-nowrap">
                Trusted by
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-4 lg:flex-nowrap">
                {(hero.clients || []).map((client, index) => {
                  // Normalize: stored content may have clients as strings (old format)
                  const clientName =
                    typeof client === "string" ? client : client?.name;
                  const clientLogoUrl =
                    typeof client === "string"
                      ? null
                      : (client?.logoUrl ?? null);
                  const clientUrl =
                    typeof client === "string" ? null : (client?.url ?? null);
                  const initials = clientName
                    ?.split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase();
                  const clientLink = clientUrl ? (
                    <a
                      href={clientUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      {clientLogoUrl ? (
                        <Image
                          src={clientLogoUrl}
                          alt={clientName}
                          className="h-full w-full object-contain rounded-full"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[11px] font-serif font-semibold uppercase tracking-[0.2em] text-ink-soft">
                          {initials}
                        </div>
                      )}
                    </a>
                  ) : clientLogoUrl ? (
                    <Image
                      src={clientLogoUrl}
                      alt={clientName}
                      className="h-full w-full object-contain"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[11px] font-serif font-semibold uppercase tracking-[0.2em] text-ink-soft">
                      {initials}
                    </div>
                  );

                  return (
                    <div
                      key={clientName || index}
                      className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-line bg-paper p-1 opacity-70 hover:opacity-100 transition-opacity group"
                      title={clientName}
                    >
                      {clientLink}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[420px]">
            <div className="absolute -inset-3 rounded-full border border-line" />
            <div className="absolute -inset-6 rounded-full border border-line/60" />
            <Image
              src={hero.portraitUrl || '/profile0.png'}
              alt="Portrait of Elvis Odhiambo"
              className="relative aspect-square w-full rounded-full object-cover"
              priority
              width={420}
              height={420}
              sizes="(max-width: 768px) 420px, 380px"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.16em] shadow-sm flex gap-3 items-center font-bold">
              Developer <div className="bg-accent w-2 h-2 rounded-full" />{" "}
              Designer <div className="bg-accent w-2 h-2 rounded-full" />{" "}
              Builder
            </div>
            {contact?.available === false && (
              <p className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-paper">
                Currently booked
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
