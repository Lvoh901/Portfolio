'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { publicFetch } from '../lib/adminApi';

const initialForm = { name: '', email: '', company: '', project: '', budget: '', timeline: '', message: '' };

const Contact = () => {
  const { content, projects } = useContent();
  const { contact, services } = content;
  const searchParams = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const projectId = searchParams?.get('project') || null;
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === projectId || project.slug === projectId),
    [projects, projectId],
  );

  const projectTypes = [
    ...(services?.items || []).map((item) => item.title),
    'Something else',
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'sending', message: '' });

    try {
      await publicFetch('/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          projectType: form.project,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          projectId: selectedProject?.id || null,
          source: selectedProject ? 'project' : 'contact',
        }),
      });

      setForm(initialForm);
      setStatus({
        state: 'sent',
        message: 'Message received. I read every enquiry personally and usually reply within one business day.',
      });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Contact
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">
              Tell me what you&apos;re building.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              {contact.responseNote}
            </p>

            <div className="mt-9 space-y-px overflow-hidden border border-line bg-line">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors hover:bg-paper-2"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-[14px] text-ink">{contact.email}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`tel:${String(contact.phone).replace(/[^+\d]/g, '')}`}
                className="group flex items-center justify-between gap-4 bg-paper px-5 py-4 transition-colors hover:bg-paper-2"
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <span className="text-[14px] text-ink">{contact.phone}</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted">
                  {contact.hours}
                </span>
              </a>
              <div className="flex items-center gap-3 bg-paper px-5 py-4">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-[14px] text-ink">{contact.location}</span>
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
            {selectedProject && (
              <p className="mb-5 border-l-2 border-accent bg-paper px-4 py-3 text-[12px] text-muted">
                Enquiry about{' '}
                <span className="font-semibold text-ink">{selectedProject.title}</span> — it will be
                filed with that project.
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
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
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
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

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Company
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    placeholder="Optional"
                    className="border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none focus:ring-0"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
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
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Budget range
                  </span>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="appearance-none border border-line bg-paper px-4 py-3 text-[14px] text-ink focus:border-ink focus:outline-none focus:ring-0"
                  >
                    <option value="">Not specified</option>
                    <option value="under-5000">Under $5,000 / KES 650k</option>
                    <option value="5000-15000">$5,000–$15,000 / KES 650k–2M</option>
                    <option value="15000-50000">$15,000–$50,000 / KES 2M–6.5M</option>
                    <option value="over-50000">Over $50,000 / KES 6.5M</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Ideal timeline
                  </span>
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="appearance-none border border-line bg-paper px-4 py-3 text-[14px] text-ink focus:border-ink focus:outline-none focus:ring-0"
                  >
                    <option value="">Not specified</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-3months">1–3 months</option>
                    <option value="3-6months">3–6 months</option>
                    <option value="6months-plus">6+ months</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
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
                disabled={status.state === 'sending'}
                className="mt-1 inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
              >
                {status.state === 'sending' ? 'Sending…' : 'Send enquiry'}
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <p
                className={`text-[11px] leading-relaxed ${
                  status.state === 'error' ? 'text-red-700' : 'text-muted'
                }`}
                role={status.state === 'error' ? 'alert' : undefined}
              >
                {status.message ||
                  'Your message is stored in the dashboard inbox, so nothing gets lost and every enquiry is tracked.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
