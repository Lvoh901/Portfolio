"use client";

import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "../contexts/ContentContext";

const navLinks = [
  { label: "Work", to: "/#work" },
  { label: "Services", to: "/#services" },
  { label: "About", to: "/#about" },
  { label: "Process", to: "/#process" },
  { label: "Design", to: "/design" },
  { label: "Contact", to: "/#contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { content } = useContent();
  const contact = content.contact;

  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 border-b border-white/60 border-dashed pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-lg leading-none text-ink hover:rounded-full">
                EO
              </span>
              <span className="font-serif text-lg">Elvis Odhiambo</span>
            </Link>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white font-medium">
              Full-stack developer and product designer in Nairobi, building web
              products that people can rely on.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                {
                  href: "https://github.com/Lvoh901",
                  label: "GitHub",
                  icon: <FaGithub className="h-3.5 w-3.5" />,
                },
                {
                  href: "https://www.linkedin.com/in/odhiamboelvis/",
                  label: "LinkedIn",
                  icon: <FaLinkedinIn className="h-3.5 w-3.5" />,
                },
                {
                  href: "https://x.com/LvohOdhis",
                  label: "X",
                  icon: <FaXTwitter className="h-3.5 w-3.5" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border-2 border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white underline decoration-2 decoration-accent underline-offset-4">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.to}
                    className="text-[13px] font-medium hover:font-bold text-white/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white underline decoration-2 decoration-accent underline-offset-4">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2 text-[13px] text-white/70">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${String(contact.phone).replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-accent"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="text-white/40">{contact.location}</li>
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 border-b border-accent pb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-accent hover:font-bold"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[11px] text-white sm:flex-row">
          <p>
            &copy; {year}{" "}
            <span className="text-accent italic font-bold">Elvis Odhiambo</span>
            . All rights reserved.
          </p>
          <p className="uppercase tracking-[0.16em]">
            Designed &amp; built with Tech
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
