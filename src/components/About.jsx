'use client';

import { Download } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { content } = useContent();
  const { about, cv } = content;

  return (
    <section id="about" className="border-b border-line bg-paper-2/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden border border-line bg-paper">
              <img
                src="/about1.webp"
                alt="Elvis Odhiambo's workspace"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between border border-line bg-paper px-4 py-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Currently</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                {content.contact?.available === false ? 'Fully booked' : 'Taking on new work'}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">About</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
              {about.heading}
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              {(about.paragraphs || []).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {(about.facts || []).map((fact) => (
                <div key={fact.label} className="bg-paper px-4 py-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-[13px] text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 space-y-6">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Engineering
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {(about.engineering || []).map((skill) => (
                    <li
                      key={skill}
                      className="border border-line bg-paper px-3 py-1.5 text-[12px] text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Design
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {(about.design || []).map((skill) => (
                    <li
                      key={skill}
                      className="border border-line bg-paper px-3 py-1.5 text-[12px] text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={cv?.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="group mt-9 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
