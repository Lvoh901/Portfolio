"use client";

import { ArrowUpRight } from "lucide-react";
import { useContent } from "../contexts/ContentContext";

const ServicePack = () => {
  const { content } = useContent();
  const services = content.services;

  return (
    <section id="services" className="border-b border-line py-16 bg-ink">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              How I can help
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08] text-[#fefefe]">
              {services.heading}
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-[#fefefe]">
              {services.intro}
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-[#fefefe] pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#fefefe] transition-colors hover:border-accent"
            >
              Discuss your project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="border-t border-line border-dashed">
            {(services.items || []).map((service, index) => (
              <div
                key={service.title}
                className="border-b border-line border-dashed py-8 transition-colors px-4 cursor-pointer"
              >
                <div className="flex gap-5">
                  <span className="font-serif text-4xl text-accent italic font-bold">
                    {service.number || String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.4rem] leading-snug text-[#fefefe]">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#fefefe] font-medium">
                      {service.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {(service.deliverables || []).map((item) => (
                        <li
                          key={item}
                          className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
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
};

export default ServicePack;
