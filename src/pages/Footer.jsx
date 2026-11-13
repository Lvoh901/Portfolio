import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Work', to: '/#work' },
  { label: 'Services', to: '/#services' },
  { label: 'About', to: '/#about' },
  { label: 'Process', to: '/#process' },
  { label: 'Design', to: '/design' },
  { label: 'Contact', to: '/#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-lg leading-none text-ink">
                EO
              </span>
              <span className="font-serif text-lg">Elvis Odhiambo</span>
            </Link>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/50 font-medium">
              Full-stack developer and product designer in Nairobi, building web products that
              people can rely on.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                {
                  href: 'https://github.com/Lvoh901',
                  label: 'GitHub',
                  icon: <FaGithub className="h-3.5 w-3.5" />,
                },
                {
                  href: 'https://www.linkedin.com/in/odhiamboelvis/',
                  label: 'LinkedIn',
                  icon: <FaLinkedinIn className="h-3.5 w-3.5" />,
                },
                {
                  href: 'https://x.com/LvohOdhis',
                  label: 'X',
                  icon: <FaXTwitter className="h-3.5 w-3.5" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white underline underline-offset-4 decoration-2">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-white/70 transition-colors hover:text-accent hover:font-bold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white underline underline-offset-4 decoration-2">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2 text-[13px] text-white/70">
              <li>
                <a
                  href="mailto:info@odhiambolvis.tech"
                  className="transition-colors hover:text-accent font-bold"
                >
                  info@odhiambolvis.tech
                </a>
              </li>
              <li>
                <a href="tel:+254718505642" className="transition-colors hover:text-accent font-bold">
                  +254 718 505 642
                </a>
              </li>
              <li className="text-white/60 font-bold">Nairobi, Kenya</li>
            </ul>
            <Link
              to="/#contact"
              className="group mt-5 inline-flex items-center gap-2 border-b border-accent pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[11px] text-white/70 sm:flex-row">
          <p className='font-medium'>&copy; {year} Elvis Odhiambo. All rights reserved.</p>
          <p className="uppercase tracking-[0.16em] font-medium">Designed &amp; built in Nairobi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
