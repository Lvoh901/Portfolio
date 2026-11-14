import { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { adminFetch } from '../../lib/adminApi';
import { useContent } from '../../contexts/ContentContext';

const Field = ({ label, value, onChange, textarea = false, rows = 3, placeholder = '', hint }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
    {textarea ? (
      <textarea
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="resize-y border border-line bg-paper px-3 py-2.5 text-[13px] leading-relaxed focus:border-ink focus:outline-none"
      />
    ) : (
      <input
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border border-line bg-paper px-3 py-2.5 text-[13px] focus:border-ink focus:outline-none"
      />
    )}
    {hint && <span className="text-[10px] text-muted">{hint}</span>}
  </label>
);

const Card = ({ title, description, children }) => (
  <section className="border border-line bg-paper">
    <div className="border-b border-line px-5 py-4">
      <h2 className="font-serif text-xl">{title}</h2>
      {description && <p className="mt-1 text-[12px] text-muted">{description}</p>}
    </div>
    <div className="space-y-4 px-5 py-5">{children}</div>
  </section>
);

const toLines = (value) => (value || '').split('\n').map((line) => line.trim()).filter(Boolean);
const toList = (value) => (value || '').split(',').map((item) => item.trim()).filter(Boolean);

const ContentEditor = () => {
  const [draft, setDraft] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const { reload } = useContent();

  useEffect(() => {
    adminFetch('/admin/content')
      .then((result) => {
        setDraft(result.content);
        setTestimonials(result.testimonials || []);
      })
      .catch((error) => setStatus({ state: 'error', message: error.message }));
  }, []);

  const patch = (section, values) =>
    setDraft((previous) => ({ ...previous, [section]: { ...previous[section], ...values } }));

  const save = async () => {
    setStatus({ state: 'saving', message: '' });
    try {
      await adminFetch('/admin/content', {
        method: 'PUT',
        body: JSON.stringify({
          updates: {
            hero: draft.hero,
            about: draft.about,
            contact: draft.contact,
            services: draft.services,
            process: draft.process,
            seo: draft.seo,
          },
        }),
      });

      await adminFetch('/admin/testimonials', {
        method: 'PUT',
        body: JSON.stringify({ items: testimonials }),
      });

      await reload();
      setStatus({ state: 'saved', message: 'Saved. The public site now serves this content.' });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  if (!draft) {
    return (
      <p className="text-[13px] text-muted">
        {status.message || 'Loading content…'}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Site</p>
          <h1 className="mt-2 font-serif text-3xl">Content</h1>
          <p className="mt-2 max-w-xl text-[13px] text-muted">
            Everything here is stored in Postgres and served to the public site on load.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={status.state === 'saving'}
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {status.state === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {(status.message || status.state === 'saved') && (
        <p
          role={status.state === 'error' ? 'alert' : undefined}
          className={`border-l-2 px-4 py-2 text-[12px] ${
            status.state === 'error'
              ? 'border-red-500 bg-paper text-red-700'
              : 'border-accent bg-paper text-muted'
          }`}
        >
          {status.message}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Hero" description="The first thing a client reads.">
          <Field
            label="Availability badge"
            value={draft.hero.badge}
            onChange={(value) => patch('hero', { badge: value })}
          />
          <Field
            label="Location"
            value={draft.hero.location}
            onChange={(value) => patch('hero', { location: value })}
          />
          <Field
            label="Headline (first line)"
            value={draft.hero.headline}
            onChange={(value) => patch('hero', { headline: value })}
          />
          <Field
            label="Headline (italic line)"
            value={draft.hero.accentLine}
            onChange={(value) => patch('hero', { accentLine: value })}
          />
          <Field
            label="Sub-headline"
            textarea
            rows={4}
            value={draft.hero.subheadline}
            onChange={(value) => patch('hero', { subheadline: value })}
          />
          <Field
            label="Clients shown under the hero"
            value={(draft.hero.clients || []).join(', ')}
            onChange={(value) => patch('hero', { clients: toList(value) })}
            hint="Comma separated"
          />
        </Card>

        <Card title="Contact details" description="Used in the contact section and footer.">
          <Field
            label="Email"
            value={draft.contact.email}
            onChange={(value) => patch('contact', { email: value })}
          />
          <Field
            label="Phone"
            value={draft.contact.phone}
            onChange={(value) => patch('contact', { phone: value })}
          />
          <Field
            label="Location"
            value={draft.contact.location}
            onChange={(value) => patch('contact', { location: value })}
          />
          <Field
            label="Hours"
            value={draft.contact.hours}
            onChange={(value) => patch('contact', { hours: value })}
          />
          <Field
            label="Intro note"
            textarea
            rows={3}
            value={draft.contact.responseNote}
            onChange={(value) => patch('contact', { responseNote: value })}
          />
          <label className="flex items-center gap-2 text-[12px] text-ink">
            <input
              type="checkbox"
              checked={draft.contact.available !== false}
              onChange={(event) => patch('contact', { available: event.target.checked })}
              className="h-4 w-4 border-line"
            />
            Available for new work
          </label>
        </Card>

        <Card title="About" description="Bio, facts and skills.">
          <Field
            label="Heading"
            value={draft.about.heading}
            onChange={(value) => patch('about', { heading: value })}
          />
          <Field
            label="Paragraphs"
            textarea
            rows={7}
            value={(draft.about.paragraphs || []).join('\n\n')}
            onChange={(value) =>
              patch('about', { paragraphs: value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) })
            }
            hint="Separate paragraphs with a blank line"
          />
          <Field
            label="Facts"
            textarea
            rows={3}
            value={(draft.about.facts || []).map((fact) => `${fact.label}: ${fact.value}`).join('\n')}
            onChange={(value) =>
              patch('about', {
                facts: toLines(value).map((line) => {
                  const [label, ...rest] = line.split(':');
                  return { label: label.trim(), value: rest.join(':').trim() };
                }),
              })
            }
            hint="One per line, e.g. “Based in: Nairobi, Kenya”"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Engineering skills"
              value={(draft.about.engineering || []).join(', ')}
              onChange={(value) => patch('about', { engineering: toList(value) })}
              hint="Comma separated"
            />
            <Field
              label="Design skills"
              value={(draft.about.design || []).join(', ')}
              onChange={(value) => patch('about', { design: toList(value) })}
              hint="Comma separated"
            />
          </div>
        </Card>

        <Card title="Process" description="How you work with clients.">
          <Field
            label="Heading"
            value={draft.process.heading}
            onChange={(value) => patch('process', { heading: value })}
          />
          <Field
            label="Intro"
            textarea
            rows={2}
            value={draft.process.intro}
            onChange={(value) => patch('process', { intro: value })}
          />
          {(draft.process.steps || []).map((step, index) => (
            <div key={index} className="border border-line bg-paper-2/40 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Step {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    patch('process', {
                      steps: draft.process.steps.filter((_, i) => i !== index),
                    })
                  }
                  aria-label="Remove step"
                  className="text-muted transition-colors hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <Field
                  label="Title"
                  value={step.title}
                  onChange={(value) =>
                    patch('process', {
                      steps: draft.process.steps.map((item, i) =>
                        i === index ? { ...item, title: value } : item,
                      ),
                    })
                  }
                />
                <Field
                  label="Description"
                  textarea
                  rows={3}
                  value={step.description}
                  onChange={(value) =>
                    patch('process', {
                      steps: draft.process.steps.map((item, i) =>
                        i === index ? { ...item, description: value } : item,
                      ),
                    })
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch('process', {
                steps: [
                  ...(draft.process.steps || []),
                  { number: String((draft.process.steps || []).length + 1).padStart(2, '0'), title: '', description: '' },
                ],
              })
            }
            className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <Plus className="h-3 w-3" /> Add step
          </button>
        </Card>
      </div>

      <Card title="Services" description="What you sell, in the order shown on the site.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Heading"
            value={draft.services.heading}
            onChange={(value) => patch('services', { heading: value })}
          />
          <Field
            label="Intro"
            value={draft.services.intro}
            onChange={(value) => patch('services', { intro: value })}
          />
        </div>

        {(draft.services.items || []).map((service, index) => (
          <div key={index} className="border border-line bg-paper-2/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Service {index + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  patch('services', {
                    items: draft.services.items.filter((_, i) => i !== index),
                  })
                }
                aria-label="Remove service"
                className="text-muted transition-colors hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <Field
                label="Title"
                value={service.title}
                onChange={(value) =>
                  patch('services', {
                    items: draft.services.items.map((item, i) =>
                      i === index ? { ...item, title: value } : item,
                    ),
                  })
                }
              />
              <Field
                label="Description"
                textarea
                rows={3}
                value={service.description}
                onChange={(value) =>
                  patch('services', {
                    items: draft.services.items.map((item, i) =>
                      i === index ? { ...item, description: value } : item,
                    ),
                  })
                }
              />
              <Field
                label="Deliverables"
                value={(service.deliverables || []).join(', ')}
                onChange={(value) =>
                  patch('services', {
                    items: draft.services.items.map((item, i) =>
                      i === index ? { ...item, deliverables: toList(value) } : item,
                    ),
                  })
                }
                hint="Comma separated"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            patch('services', {
              items: [
                ...(draft.services.items || []),
                {
                  number: String((draft.services.items || []).length + 1).padStart(2, '0'),
                  title: '',
                  description: '',
                  deliverables: [],
                },
              ],
            })
          }
          className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <Plus className="h-3 w-3" /> Add service
        </button>
      </Card>

      <Card title="Testimonials" description="Client quotes shown on the dark band.">
        {testimonials.map((item, index) => (
          <div key={index} className="border border-line bg-paper-2/40 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Quote {index + 1}
              </span>
              <button
                type="button"
                onClick={() => setTestimonials(testimonials.filter((_, i) => i !== index))}
                aria-label="Remove quote"
                className="text-muted transition-colors hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <Field
                label="Quote"
                textarea
                rows={3}
                value={item.quote}
                onChange={(value) =>
                  setTestimonials(
                    testimonials.map((entry, i) => (i === index ? { ...entry, quote: value } : entry)),
                  )
                }
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <Field
                  label="Author"
                  value={item.author}
                  onChange={(value) =>
                    setTestimonials(
                      testimonials.map((entry, i) =>
                        i === index ? { ...entry, author: value } : entry,
                      ),
                    )
                  }
                />
                <Field
                  label="Role"
                  value={item.role}
                  onChange={(value) =>
                    setTestimonials(
                      testimonials.map((entry, i) => (i === index ? { ...entry, role: value } : entry)),
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setTestimonials([...testimonials, { quote: '', author: '', role: '' }])}
          className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <Plus className="h-3 w-3" /> Add testimonial
        </button>
      </Card>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={status.state === 'saving'}
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {status.state === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
