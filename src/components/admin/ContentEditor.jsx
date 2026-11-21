"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlus, Plus, Save, Trash2, Upload } from "lucide-react";
import { adminFetch } from "../../lib/adminApi";
import { useContent } from "../../contexts/ContentContext";
import { useUploadThing } from "../../lib/uploadthing";
import toast from "../../lib/toast";

const Field = ({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
  placeholder = "",
  hint,
}) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
      {label}
    </span>
    {textarea ? (
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="resize-y border border-accent bg-paper px-3 py-2.5 text-[13px] leading-relaxed focus:border-ink focus:outline-none"
      />
    ) : (
      <input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border border-accent bg-paper px-3 py-2.5 text-[13px] focus:border-ink focus:outline-none"
      />
    )}
    {hint && <span className="text-[10px] text-muted">{hint}</span>}
  </label>
);

const toLines = (value) =>
  (value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
const toList = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const tabs = [
  { id: "hero", label: "Hero", description: "First thing a client reads" },
  {
    id: "contact",
    label: "Contact",
    description: "Contact details and footer",
  },
  { id: "about", label: "About", description: "Bio, facts and skills" },
  { id: "process", label: "Process", description: "How you work with clients" },
  { id: "services", label: "Services", description: "What you sell" },
  { id: "testimonials", label: "Testimonials", description: "Client quotes" },
];

const ContentEditor = () => {
  const [draft, setDraft] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [logoBusy, setLogoBusy] = useState({});
  const [portraitBusy, setPortraitBusy] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const { reload } = useContent();

  // UploadThing calls /api/uploadthing with the admin JWT attached.
  const { startUpload: uploadClientLogo } = useUploadThing("clientLogo", {
    headers: async () => ({
      Authorization: `Bearer ${localStorage.getItem("portfolio_token")}`,
    }),
  });

  useEffect(() => {
    adminFetch("/admin/content")
      .then((result) => {
        setDraft(result.content);
        setTestimonials(result.testimonials || []);
      })
      .catch((error) => toast.error("Could not load content", error.message));
  }, []);

  const patch = (section, values) =>
    setDraft((previous) => ({
      ...previous,
      [section]: { ...previous[section], ...values },
    }));

  const uploadClientLogoFor = async (clientIndex, file) => {
    if (!file) return;
    setLogoBusy((previous) => ({ ...previous, [clientIndex]: true }));
    try {
      const uploaded = await uploadClientLogo([file]);
      const result = uploaded?.[0];
      if (!result) throw new Error("Upload failed. Please try again.");

      const logoUrl = result.ufsUrl || result.url;
      patch("hero", {
        clients: (draft.hero.clients || []).map((client, i) =>
          i === clientIndex ? { ...client, logoUrl } : client,
        ),
      });
    } catch (error) {
      toast.error("Logo upload failed", error.message);
    } finally {
      setLogoBusy((previous) => ({ ...previous, [clientIndex]: false }));
    }
  };

  const uploadPortrait = async (file) => {
    if (!file) return;
    setPortraitBusy(true);
    try {
      const uploaded = await uploadClientLogo([file]);
      const result = uploaded?.[0];
      if (!result) throw new Error("Upload failed. Please try again.");

      const logoUrl = result.ufsUrl || result.url;
      patch("hero", { portraitUrl: logoUrl });
    } catch (error) {
      toast.error("Portrait upload failed", error.message);
    } finally {
      setPortraitBusy(false);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      await adminFetch("/admin/content", {
        method: "PUT",
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

      await adminFetch("/admin/testimonials", {
        method: "PUT",
        body: JSON.stringify({ items: testimonials }),
      });

      await reload();
      toast.success("Saved", "The public site now serves this content.");
    } catch (error) {
      toast.error("Save failed", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!draft) {
    return <p className="text-[13px] text-muted">Loading content…</p>;
  }

  const tab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            Site
          </p>
          <h1 className="font-serif text-3xl">Content</h1>
          <p className="max-w-xl text-[13px] font-medium">
            Everything here is stored in Postgres and served to the public site
            on load.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {/* Section tabs */}
      <div className="border-b border-line">
        <div className="flex flex-wrap gap-1 -mb-px">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] border-b-2 mb-[-1px] transition-colors cursor-pointer ${
                  isActive
                    ? "border-accent text-ink bg-paper-2/40"
                    : "border-transparent text-muted hover:text-ink hover:border-line/50"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tab content */}
      <div className="space-y-6">
        {activeTab === "hero" && (
          <section className="border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <p className="font-bold text-xl">{tab.label}</p>
              <p className="text-[12px] font-medium">{tab.description}</p>
            </div>
            <div className="space-y-5 px-5 py-5">
              <Field
                label="Availability badge"
                value={draft.hero.badge}
                onChange={(value) => patch("hero", { badge: value })}
              />
              <Field
                label="Location"
                value={draft.hero.location}
                onChange={(value) => patch("hero", { location: value })}
              />
              <div className="space-y-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Portrait photo
                  </span>
                  <span className="text-[10px] text-muted">
                    Portrait shown on the home page hero section
                  </span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden border border-line rounded-full bg-paper-2/50 relative">
                    {draft.hero.portraitUrl ? (
                      <Image
                        src={draft.hero.portraitUrl}
                        alt="Portrait"
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-serif font-semibold uppercase tracking-[0.18em] text-muted">
                        EO
                      </div>
                    )}
                    {portraitBusy && (
                      <div className="absolute inset-0 flex items-center justify-center bg-paper/90 backdrop-blur-sm">
                        <p className="text-[10px] text-muted">Uploading…</p>
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed">
                    <Upload className="h-3 w-3" />
                    Portrait
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={portraitBusy}
                      onChange={(event) => uploadPortrait(event.target.files?.[0])}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => patch("hero", { portraitUrl: null })}
                    disabled={portraitBusy}
                    aria-label="Remove portrait"
                    className="text-muted transition-colors hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Field
                label="Headline (first line)"
                value={draft.hero.headline}
                onChange={(value) => patch("hero", { headline: value })}
              />
              <Field
                label="Headline (italic line)"
                value={draft.hero.accentLine}
                onChange={(value) => patch("hero", { accentLine: value })}
              />
              <Field
                label="Sub-headline"
                textarea
                rows={4}
                value={draft.hero.subheadline}
                onChange={(value) => patch("hero", { subheadline: value })}
              />
              <div className="space-y-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Clients shown under the hero
                  </span>
                  <span className="text-[10px] text-muted">
                    Upload a logo for each client (or leave blank for initials),
                    and optionally link to their site.
                  </span>
                </label>
                <div className="border border-line bg-paper rounded-lg p-3 space-y-3">
                  {(draft.hero.clients || []).map((client, index) => {
                    const cName =
                      typeof client === "string" ? client : client?.name;
                    const cLogoUrl =
                      typeof client === "string"
                        ? null
                        : (client?.logoUrl ?? null);
                    const cUrl =
                      typeof client === "string" ? null : (client?.url ?? null);
                    return (
                      <div
                        key={index}
                        className="flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden border border-line rounded-full bg-paper-2/50 relative">
                            {cLogoUrl ? (
                              <Image
                                src={cLogoUrl}
                                alt={cName}
                                className="h-full w-full object-contain"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-serif font-semibold uppercase tracking-[0.18em] text-muted">
                                {cName
                                  ?.split(" ")
                                  .map((word) => word.charAt(0))
                                  .join("")
                                  .toUpperCase()}
                              </div>
                            )}
                            {logoBusy[index] && (
                              <div className="absolute inset-0 flex items-center justify-center bg-paper/90 backdrop-blur-sm">
                                <p className="text-[10px] text-muted">
                                  Uploading…
                                </p>
                              </div>
                            )}
                          </div>
                          <label className="inline-flex cursor-pointer items-center gap-1.5 border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed">
                            <Upload className="h-3 w-3" />
                            Logo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={logoBusy[index]}
                              onChange={(event) =>
                                uploadClientLogoFor(
                                  index,
                                  event.target.files?.[0],
                                )
                              }
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <label className="flex flex-col gap-1 w-full">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                              Name
                            </span>
                            <input
                              value={cName}
                              onChange={(event) =>
                                patch("hero", {
                                  clients: (draft.hero.clients || []).map(
                                    (c, i) =>
                                      i === index
                                        ? { ...c, name: event.target.value }
                                        : c,
                                  ),
                                })
                              }
                              className="border border-line bg-paper px-3 py-2 text-[13px] w-full focus:border-ink focus:outline-none"
                            />
                          </label>
                          <label className="flex flex-col gap-1 w-full">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                              Link (optional)
                            </span>
                            <input
                              value={cUrl || ""}
                              placeholder="https://client.com"
                              onChange={(event) =>
                                patch("hero", {
                                  clients: (draft.hero.clients || []).map(
                                    (c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            url: event.target.value || null,
                                          }
                                        : c,
                                  ),
                                })
                              }
                              className="border border-line bg-paper px-3 py-2 text-[13px] w-full focus:border-ink focus:outline-none"
                            />
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            patch("hero", {
                              clients: (draft.hero.clients || []).filter(
                                (_, i) => i !== index,
                              ),
                            })
                          }
                          aria-label="Remove client"
                          className="text-muted transition-colors hover:text-red-700 disabled:opacity-50"
                          disabled={logoBusy[index]}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() =>
                      patch("hero", {
                        clients: [
                          ...(draft.hero.clients || []),
                          { name: "", logoUrl: null, url: null },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <Plus className="h-3 w-3" /> Add client
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section className="border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <p className="font-bold text-xl">{tab.label}</p>
              <p className="text-[12px] font-medium">{tab.description}</p>
            </div>
            <div className="space-y-5 px-5 py-5">
              <Field
                label="Email"
                value={draft.contact.email}
                onChange={(value) => patch("contact", { email: value })}
              />
              <Field
                label="Phone"
                value={draft.contact.phone}
                onChange={(value) => patch("contact", { phone: value })}
              />
              <Field
                label="Location"
                value={draft.contact.location}
                onChange={(value) => patch("contact", { location: value })}
              />
              <Field
                label="Hours"
                value={draft.contact.hours}
                onChange={(value) => patch("contact", { hours: value })}
              />
              <Field
                label="Intro note"
                textarea
                rows={3}
                value={draft.contact.responseNote}
                onChange={(value) => patch("contact", { responseNote: value })}
              />
              <label className="flex items-center gap-2 text-[12px] text-ink">
                <input
                  type="checkbox"
                  checked={draft.contact.available !== false}
                  onChange={(event) =>
                    patch("contact", { available: event.target.checked })
                  }
                  className="h-4 w-4 border-line"
                />
                Available for new work
              </label>
            </div>
          </section>
        )}

        {activeTab === "about" && (
          <section className="border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <p className="font-bold text-xl">{tab.label}</p>
              <p className="text-[12px] font-medium">{tab.description}</p>
            </div>
            <div className="space-y-5 px-5 py-5">
              <Field
                label="Heading"
                value={draft.about.heading}
                onChange={(value) => patch("about", { heading: value })}
              />
              <Field
                label="Paragraphs"
                textarea
                rows={7}
                value={(draft.about.paragraphs || []).join("\n\n")}
                onChange={(value) =>
                  patch("about", {
                    paragraphs: value
                      .split(/\n\s*\n/)
                      .map((p) => p.trim())
                      .filter(Boolean),
                  })
                }
                hint="Separate paragraphs with a blank line"
              />
              <Field
                label="Facts"
                textarea
                rows={3}
                value={(draft.about.facts || [])
                  .map((fact) => `${fact.label}: ${fact.value}`)
                  .join("\n")}
                onChange={(value) =>
                  patch("about", {
                    facts: toLines(value).map((line) => {
                      const [label, ...rest] = line.split(":");
                      return {
                        label: label.trim(),
                        value: rest.join(":").trim(),
                      };
                    }),
                  })
                }
                hint="One per line, e.g. “Based in: Nairobi, Kenya”"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Engineering skills"
                  value={(draft.about.engineering || []).join(", ")}
                  onChange={(value) =>
                    patch("about", { engineering: toList(value) })
                  }
                  hint="Comma separated"
                />
                <Field
                  label="Design skills"
                  value={(draft.about.design || []).join(", ")}
                  onChange={(value) =>
                    patch("about", { design: toList(value) })
                  }
                  hint="Comma separated"
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === "process" && (
          <section className="border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <p className="font-bold text-xl">{tab.label}</p>
              <p className="text-[12px] font-medium">{tab.description}</p>
            </div>
            <div className="space-y-5 px-5 py-5">
              <Field
                label="Heading"
                value={draft.process.heading}
                onChange={(value) => patch("process", { heading: value })}
              />
              <Field
                label="Intro"
                textarea
                rows={2}
                value={draft.process.intro}
                onChange={(value) => patch("process", { intro: value })}
              />
              {(draft.process.steps || []).map((step, index) => (
                <div
                  key={index}
                  className="border border-line bg-paper-2/40 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Step {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        patch("process", {
                          steps: draft.process.steps.filter(
                            (_, i) => i !== index,
                          ),
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
                        patch("process", {
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
                        patch("process", {
                          steps: draft.process.steps.map((item, i) =>
                            i === index
                              ? { ...item, description: value }
                              : item,
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
                  patch("process", {
                    steps: [
                      ...(draft.process.steps || []),
                      {
                        number: String(
                          (draft.process.steps || []).length + 1,
                        ).padStart(2, "0"),
                        title: "",
                        description: "",
                      },
                    ],
                  })
                }
                className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                <Plus className="h-3 w-3" /> Add step
              </button>
            </div>
          </section>
        )}

        {activeTab === "services" && (
          <section className="border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <p className="font-bold text-xl">{tab.label}</p>
              <p className="text-[12px] font-medium">{tab.description}</p>
            </div>
            <div className="space-y-5 px-5 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Heading"
                  value={draft.services.heading}
                  onChange={(value) => patch("services", { heading: value })}
                />
                <Field
                  label="Intro"
                  value={draft.services.intro}
                  onChange={(value) => patch("services", { intro: value })}
                />
              </div>

              {(draft.services.items || []).map((service, index) => (
                <div
                  key={index}
                  className="border border-line bg-paper-2/40 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Service {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        patch("services", {
                          items: draft.services.items.filter(
                            (_, i) => i !== index,
                          ),
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
                        patch("services", {
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
                        patch("services", {
                          items: draft.services.items.map((item, i) =>
                            i === index
                              ? { ...item, description: value }
                              : item,
                          ),
                        })
                      }
                    />
                    <Field
                      label="Deliverables"
                      value={(service.deliverables || []).join(", ")}
                      onChange={(value) =>
                        patch("services", {
                          items: draft.services.items.map((item, i) =>
                            i === index
                              ? { ...item, deliverables: toList(value) }
                              : item,
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
                  patch("services", {
                    items: [
                      ...(draft.services.items || []),
                      {
                        number: String(
                          (draft.services.items || []).length + 1,
                        ).padStart(2, "0"),
                        title: "",
                        description: "",
                        deliverables: [],
                      },
                    ],
                  })
                }
                className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                <Plus className="h-3 w-3" /> Add service
              </button>
            </div>
          </section>
        )}

        {activeTab === "testimonials" && (
          <section className="border border-line bg-paper">
            <div className="border-b border-line px-5 py-4">
              <p className="font-bold text-xl">{tab.label}</p>
              <p className="text-[12px] font-medium">{tab.description}</p>
            </div>
            <div className="space-y-5 px-5 py-5">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="border border-line bg-paper-2/40 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Quote {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setTestimonials(
                          testimonials.filter((_, i) => i !== index),
                        )
                      }
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
                          testimonials.map((entry, i) =>
                            i === index ? { ...entry, quote: value } : entry,
                          ),
                        )
                      }
                    />
                    <div className="grid gap-2 sm:grid-cols-3">
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
                            testimonials.map((entry, i) =>
                              i === index ? { ...entry, role: value } : entry,
                            ),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTestimonials([
                    ...testimonials,
                    { quote: "", author: "", role: "" },
                  ])
                }
                className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                <Plus className="h-3 w-3" /> Add testimonial
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
