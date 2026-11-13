import { Download } from 'lucide-react';

const engineering = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'Laravel',
  'REST APIs',
  'SQL & NoSQL',
  'Tailwind CSS',
  'Vue',
  'Flutter',
];

const design = ['UI/UX design', 'Design systems', 'Brand identity', 'Logo design', 'Social media design'];

const facts = [
  { label: 'Based in', value: 'Nairobi, Kenya' },
  { label: 'Working', value: 'On-site & remote' },
  { label: 'Focus', value: 'Web apps & product design' },
];

const About = () => (
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
              Taking on new work
            </span>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">About</p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
            A developer who designs, and a designer who ships.
          </h2>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed">
            <p>
              I&apos;m Elvis, a full-stack developer and self-taught product designer based in
              Nairobi. For the past few years I&apos;ve built platforms for public institutions,
              telecoms, and small businesses — work that has to be dependable long after launch day.
            </p>
            <p>
              Because I handle both the design and the code, nothing gets lost in translation
              between a mockup and a working product. You get one point of contact, honest
              timelines, and a build you can actually maintain.
            </p>
            <p>
              When I&apos;m not working, I&apos;m usually exploring type and layout, tinkering with
              hardware, or taking a long walk with a camera.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-paper px-4 py-4">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[13px] text-ink font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 space-y-6">
            <div>
              <h3 className="text-[13px] font-serif font-bold tracking-[0.18em]">
                Engineering
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                {engineering.map((skill) => (
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
              <h3 className="text-[13px] font-serif font-bold tracking-[0.18em]">
                Design
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                {design.map((skill) => (
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
            href="/Elvis Odhiambo_Fullstack Developer.pdf"
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

export default About;
