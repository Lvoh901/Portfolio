import { useContent } from '../contexts/ContentContext';

const Testimonial = () => {
  const { testimonials } = useContent();

  if (!testimonials?.length) return null;

  return (
    <section className="bg-ink py-20 text-paper lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Client feedback
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
              Trusted with work that matters.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-white/50">
            Institutions and businesses that needed the job done properly, once.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {testimonials.map((item) => (
            <figure key={item.id || item.author} className="flex h-full flex-col justify-between">
              <div>
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-accent">
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-[15px] leading-relaxed text-white/80">
                  {item.quote}
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-white/15 pt-4">
                <p className="text-[13px] font-semibold text-white">{item.author}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {item.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
