"use client";

import { useContent } from "../contexts/ContentContext";

const Testimonial = () => {
  const { testimonials } = useContent();

  if (!testimonials?.length) return null;

  return (
    <section className="bg-ink py-16 text-paper">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Client feedback
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
              Trusted with work that matters.
            </h2>
          </div>
          <p className="text-[13px] leading-relaxed text-white/50">
            Institutions and businesses that needed the job done properly, once.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {testimonials.map((item) => (
            <figure
              key={item.id || item.author}
              className="flex h-full flex-col justify-between border-t border-dashed border-white/40 p-4"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl leading-none text-accent"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-[15px] leading-relaxed text-white/80">
                  {item.quote}
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-white/30 pt-4">
                <p className="text-[13px] font-semibold text-white">
                  {item.author}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {item.role}
                </p>
                {item.metric && (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-accent font-semibold">
                    {item.metric}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
