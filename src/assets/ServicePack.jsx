import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Web & mobile applications',
    description:
      'Custom-built products using React, Next.js, Node and Laravel \u2014 engineered to be fast, secure, and easy for your team to run day to day.',
    deliverables: ['Product scoping', 'Front-end & back-end', 'Deployment & handover'],
  },
  {
    number: '02',
    title: 'UI/UX design',
    description:
      'Interfaces your customers can use without a manual. Wireframes, design systems, and prototypes grounded in how the product actually gets used.',
    deliverables: ['User flows', 'Interface design', 'Design system'],
  },
  {
    number: '03',
    title: 'Brand & identity',
    description:
      'Logo, typography, colour and the rules that hold them together \u2014 a visual identity that looks credible wherever your brand appears.',
    deliverables: ['Logo suite', 'Brand guidelines', 'Social & print assets'],
  },
  {
    number: '04',
    title: 'Digital product strategy',
    description:
      'An outside perspective before you spend the budget: what to build first, what to leave out, and how the pieces fit together.',
    deliverables: ['Discovery workshop', 'Roadmap', 'Technical review'],
  },
];

const ServicePack = () => (
  <section id="services" className="border-b border-line py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
            How I can help
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
            One partner from concept to launch.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed">
            Design and engineering under one roof means fewer handoffs, fewer miscommunications,
            and a product that looks the way it was promised.
          </p>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent"
          >
            Discuss your project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="border-t border-line">
          {services.map((service) => (
            <div
              key={service.number}
              className="border-b border-line py-8 px-4 cursor-pointer transition-colors hover:bg-paper-2/60"
            >
              <div className="flex gap-5">
                <div className="text-2xl lg:text-3xl font-serif text-accent italic">{service.number}</div>
                <div className="flex-1">
                  <h3 className="font-serif text-[1.4rem] leading-snug">{service.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted border border-line p-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ServicePack;
