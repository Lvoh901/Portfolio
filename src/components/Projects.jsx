'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const MotionArticle = motion.article;

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'launched', label: 'Live' },
  { id: 'in-progress', label: 'In progress' },
];

const Projects = () => {
  const { projects } = useContent();
  const [activeFilter, setActiveFilter] = useState('all');

  const visible =
    activeFilter === 'all' ? projects : projects.filter((project) => project.stage === activeFilter);

  return (
    <section id="work" className="border-b border-line py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-line pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Selected work
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.08]">
              Projects shipped for real people and real deadlines.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`relative pb-1 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  activeFilter === filter.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {visible.map((project, index) => (
            <MotionArticle
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
              className="group block"
            >
              <a
                href={project.linkUrl || undefined}
                target={project.linkUrl ? '_blank' : undefined}
                rel={project.linkUrl ? 'noreferrer' : undefined}
                className={`block ${project.linkUrl ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-2">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-paper-2 font-serif text-2xl text-muted">
                      {project.title}
                    </div>
                  )}
                  <span className="absolute left-0 top-0 bg-paper px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
                    {project.stage === 'launched' ? 'Live' : 'In development'}
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {project.category}
                    </p>
                    <h3 className="mt-1.5 font-serif text-2xl">{project.title}</h3>
                    {project.role && (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                        {project.role}
                      </p>
                    )}
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    {project.outcome && (
                      <p className="mt-3 text-[12px] leading-relaxed text-ink-soft font-medium">
                        <span className="font-serif uppercase tracking-[0.12em] text-[10px] text-muted mr-1">
                          Outcome
                        </span>
                        {project.outcome}
                      </p>
                    )}
                  </div>
                  {project.linkUrl ? (
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  ) : (
                    <span className="mt-1 shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted">
                      On request
                    </span>
                  )}
                </div>
              </a>

              <Link
                href={`/contact?project=${project.id}`}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Discuss a project like this
              </Link>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
