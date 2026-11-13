import { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const EMAIL = 'info@odhiambolvis.tech';
const PHONE = '+254 718 505 642';

const projectTypes = [
  'Website or web application',
  'Mobile application',
  'UI/UX design',
  'Brand identity',
  'Product strategy',
  'Something else',
];

const initialForm = { name: '', email: '', project: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `${form.project || 'New project'} \u2014 ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.project}`,
      '',
      form.message,
    ].join('\n');

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus(
      `Your email client is opening with the message ready to send. If nothing happens, email me directly at ${EMAIL}.`
    );
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
              Contact
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">
              Tell me what you&apos;re building.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed">
              A short description is enough to start. I&apos;ll come back with questions, an honest
              opinion, and a clear next step &mdash; usually within one business day.
            </p>

            <div className="mt-9 space-y-px overflow-hidden border border-line bg-line">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors hover:bg-paper-2"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-black bg-accent p-1 rounded-full" />
                  <span className="text-[14px] text-ink font-medium">{EMAIL}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}
                className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors hover:bg-paper-2"
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-black bg-accent p-1 rounded-full" />
                  <span className="text-[14px] text-ink font-medium">{PHONE}</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted">
                  Mon&ndash;Fri, 8am&ndash;5pm EAT
                </span>
              </a>
              <div className="flex items-center gap-3 bg-paper px-5 py-4">
                <MapPin className="h-6 w-6 text-black bg-accent p-1 rounded-full" />
                <span className="text-[14px] text-ink font-medium">Nairobi, Kenya</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Find me
              </span>
              <div className="flex items-center gap-2">
                {[
                  {
                    href: 'https://github.com/Lvoh901',
                    label: 'GitHub',
                    icon: <FaGithub className="h-4 w-4" />,
                  },
                  {
                    href: 'https://www.linkedin.com/in/odhiamboelvis/',
                    label: 'LinkedIn',
                    icon: <FaLinkedinIn className="h-4 w-4" />,
                  },
                  {
                    href: 'https://x.com/LvohOdhis',
                    label: 'X',
                    icon: <FaXTwitter className="h-4 w-4" />,
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-line bg-paper-2/40 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-0"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-0"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  What do you need?
                </span>
                <select
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  required
                  className="appearance-none border border-line bg-paper px-4 py-3 text-[14px] text-ink focus:border-ink focus:outline-none focus:ring-0"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  Project details
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="What are you building, who is it for, and when would you like it live?"
                  className="resize-none border border-line bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-0"
                />
              </label>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink"
              >
                Send enquiry
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <p className="text-[11px] leading-relaxed text-muted text-center font-medium">
                {status ||
                  'This opens your email app with the details filled in, so nothing gets lost and you keep a copy in your sent folder.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
