'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sling as Hamburger } from "hamburger-react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Work", to: "/#work" },
  { label: "Services", to: "/#services" },
  { label: "About", to: "/#about" },
  { label: "Process", to: "/#process" },
  { label: "Design", to: "/design" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  // close the menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // lock background scrolling while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // desktop resize should dismiss the mobile panel so scrolling is never left locked
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // escape closes the menu
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const isActive = (to) => {
    if (to === "/design") return pathname === "/design";
    return pathname === "/";
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
            aria-label="Elvis Odhiambo — home"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent font-serif text-lg leading-none text-ink">
              EO
            </span>
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate text-sm font-semibold tracking-tight">
                Elvis Odhiambo
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.16em] text-muted md:block">
                Developer &amp; Designer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.to}
                className={`whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-ink ${
                  isActive(link.to) ? "text-ink" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <span className="hidden items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] font-bold xl:flex">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping [animation-duration:2s] border" />
              Available
            </span>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 whitespace-nowrap bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent hover:text-ink"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="-mr-3 shrink-0 text-ink lg:hidden">
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              size={22}
              distance="sm"
              duration={0.45}
              hideOutline={false}
              label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="menu-in fixed inset-0 z-40 overflow-y-auto bg-paper lg:hidden"
        >
          <div className="flex min-h-full flex-col px-5 pb-10 pt-[88px] sm:px-6">
            <nav
              aria-label="Mobile"
              className="flex flex-col border-t border-line"
            >
              {links.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.to}
                  onClick={closeMenu}
                  className="menu-item flex items-center justify-between border-b border-line py-4 font-serif text-[1.75rem] leading-tight text-ink sm:py-5 sm:text-3xl"
                  style={{ animationDelay: `${0.04 + index * 0.04}s` }}
                >
                  {link.label}
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4 pt-10">
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:info@odhiambolvis.tech"
                className="block truncate text-center text-[13px] text-muted"
              >
                info@odhiambolvis.tech
              </a>
              <p className="text-center text-[11px] uppercase tracking-[0.14em] text-muted">
                Nairobi, Kenya · Open to remote work
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
