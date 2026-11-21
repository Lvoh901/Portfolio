"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "../contexts/ContentContext";

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      key={item.q}
      className="border-b border-line/50 last:border-0"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left text-ink transition-colors hover:text-accent focus:outline-none"
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="text-[15px] font-bold cursor-pointer leading-relaxed">
          {item.q}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`faq-panel-${index}`}
        className="overflow-hidden"
        style={{
          maxHeight: open ? 1000 : 0,
          transition: "max-height 0.3s ease-out",
        }}
      >
        <p className="pb-4 text-[14px] leading-relaxed font-medium">{item.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { content } = useContent();
  const { faq } = content;

  if (!faq?.items?.length) return null;

  return (
    <section id="faq" className="border-b border-line py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
            Frequently asked
          </p>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
            {faq.heading}
          </h2>
        </div>

        <div className="space-y-0">
          {faq.items.map((item, index) => (
            <FaqItem key={item.q} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
