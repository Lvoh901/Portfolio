const steps = [
  {
    number: '01',
    title: 'Discover & align',
    description:
      'A conversation about your goals, your users, and what success looks like. We agree the scope, the budget, and the timeline before anything is built.',
  },
  {
    number: '02',
    title: 'Strategy & preview',
    description:
      'I map the architecture and show you wireframes or mockups. You see the direction — and approve it — before development starts.',
  },
  {
    number: '03',
    title: 'Build & feedback',
    description:
      'Work happens in short, visible stages. You get working previews and regular updates, so there are no surprises at the end.',
  },
  {
    number: '04',
    title: 'Launch & support',
    description:
      'Your product goes live with documentation and a handover session. I stay reachable for fixes and improvements after launch.',
  },
];

const Process = () => (
  <section id="process" className="border-b border-line py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
            The process
          </p>
          <h2 className="mt-2 max-w-xl font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
            Clear steps. No guesswork.
          </h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          You&apos;ll always know what stage we&apos;re at, what&apos;s next, and what I need from
          you.
        </p>
      </div>

      <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="group bg-paper p-7 transition-colors hover:bg-paper-2">
            <div className="flex items-center justify-between">
              <span className="font-serif text-3xl text-accent italic">{step.number}</span>
              <span className="h-2 w-10 bg-line transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
            </div>
            <h3 className="mt-4 font-serif text-xl leading-snug">{step.title}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed font-medium">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
