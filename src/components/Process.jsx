"use client";

import { useContent } from "../contexts/ContentContext";

const Process = () => {
  const { content } = useContent();
  const process = content.process;

  return (
    <section id="process" className="border-b border-line py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="">
          <div className="mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              The process
            </p>
            <h2 className="max-w-xl font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
              {process.heading}
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed font-medium">
            {process.intro}
          </p>
        </div>

        <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 cursor-pointer">
          {(process.steps || []).map((step, index) => (
            <li
              key={step.title}
              className="group bg-paper p-7 transition-colors hover:bg-paper-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-accent italic font-bold">
                  {step.number || String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-2 w-10 bg-line transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
              </div>
              <h3 className="mt-4 font-serif text-xl leading-snug">
                {step.title}
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed font-medium">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
