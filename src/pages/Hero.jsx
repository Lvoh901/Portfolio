import { ArrowDownRight, Download } from 'lucide-react';

const clients = [
  'Land Surveyors\u2019 Board',
  'Citikom',
  'Survey of Kenya',
  'Intelliworks',
  'LeGance',
];

const Hero = () => (
  <section className="relative overflow-hidden border-b border-line">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-line/80"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-line/80"
    />

    <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <div className="reveal flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Available for new projects
            </span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-muted sm:block">
              Nairobi, Kenya
            </span>
          </div>

          <h1
            className="reveal mt-7 font-serif text-[clamp(2.6rem,5.6vw,4.35rem)] leading-[1.03] tracking-[-0.02em]"
            style={{ animationDelay: '0.08s' }}
          >
            Beautiful software, built to do
            <span className="italic text-ink-soft"> real work.</span>
          </h1>

          <p
            className="reveal mt-7 max-w-xl text-[1.0625rem] leading-relaxed"
            style={{ animationDelay: '0.16s' }}
          >
            I&apos;m Elvis Odhiambo, a full-stack developer and product designer. I take ideas from
            first sketch to a live, reliable product &mdash; for government agencies, telecoms, and
            businesses that need software to carry their work.
          </p>

          <div
            className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.24s' }}
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink"
            >
              View selected work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/Elvis Odhiambo_Fullstack Developer.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 border border-line px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6 lg:mt-14"
            style={{ animationDelay: '0.32s' }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] underline underline-offset-4">
              Worked with:
            </span>
            {clients.map((client) => (
              <span key={client} className="text-[15px] text-ink-soft">
                {client},
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[420px]">
          <div className="absolute -inset-3 rounded-full border border-line animate-bounce" />
          <div className="absolute -inset-6 rounded-full border border-line/60" />
          <img
            src="/profile0.png"
            alt="Portrait of Elvis Odhiambo"
            className="relative aspect-square w-full rounded-full object-cover"
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap border border-line bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-medium shadow-sm">
            Developer <span className="text-accent">·</span> Designer{' '}
            <span className="text-accent">·</span> Builder
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
