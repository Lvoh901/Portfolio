import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    image: '/work/lsb.webp',
    title: 'Land Surveyors\u2019 Board',
    category: 'Public sector',
    description:
      'Digital transformation of Kenya\u2019s land surveying practice \u2014 a public-facing platform for a national regulatory board.',
    linkUrl: 'https://lsb.go.ke/',
    stage: 'launched',
  },
  {
    id: 2,
    image: '/work/citikom.webp',
    title: 'Citikom',
    category: 'Telecommunications',
    description:
      'A modern web presence for a connectivity and network coverage provider, replacing an outdated legacy site.',
    linkUrl: 'https://citikom.co.ke/',
    stage: 'launched',
  },
  {
    id: 3,
    image: '/work/SoK.webp',
    title: 'Survey of Kenya',
    category: 'Public sector',
    description:
      'Platform work for the state department responsible for regulating survey and mapping activity in Kenya.',
    linkUrl: 'https://survey-kenya.vercel.app/',
    stage: 'in-progress',
  },
  {
    id: 4,
    image: '/work/thriftmall.webp',
    title: 'ThriftMall',
    category: 'Commerce',
    description:
      'A buying and selling platform for pre-owned goods, built around simple listing and discovery flows.',
    linkUrl: 'https://thrifmall.vercel.app/',
    stage: 'in-progress',
  },
  {
    id: 5,
    image: '/work/intelliworks.webp',
    title: 'Intelliworks',
    category: 'GeoICT',
    description:
      'Website and product story for a GeoICT firm specialising in data-driven systems and modern software.',
    linkUrl: 'https://roy-nine.vercel.app/',
    stage: 'in-progress',
  },
  {
    id: 6,
    image: '/work/curioshop.webp',
    title: 'LeGance',
    category: 'Retail',
    description:
      'A storefront for handcrafted curios and home pieces, with a catalogue and brand identity that feel considered.',
    linkUrl: 'https://curioshop.vercel.app/',
    stage: 'in-progress',
  },
  {
    id: 7,
    image: '/work/mindmaze.webp',
    title: 'MindMaze',
    category: 'Product',
    description:
      'A knowledge quiz game with a risk-and-reward twist, powered by an open question API.',
    linkUrl: 'https://mindmaze-riskreward.vercel.app/',
    stage: 'in-progress',
  },
  {
    id: 8,
    image: '/work/opendata.webp',
    title: 'OpenData Insights',
    category: 'Data',
    description:
      'A dashboard turning open World Bank data into readable trends and patterns for Kenya.',
    linkUrl: 'https://open-lens-insights.vercel.app/?dataset=economy_inflation_kenya',
    stage: 'in-progress',
  },
  {
    id: 9,
    image: '/work/agency.webp',
    title: 'Agency Site',
    category: 'Studio',
    description:
      'A layout and identity study for a creative agency \u2014 services, selected work, and contact in one clean flow.',
    linkUrl: '',
    stage: 'in-progress',
  },
];

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'launched', label: 'Live' },
  { id: 'in-progress', label: 'In progress' },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const visible =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.stage === activeFilter);

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
          {visible.map((project, index) => {
            const Card = project.linkUrl ? motion.a : motion.div;
            const linkProps = project.linkUrl
              ? { href: project.linkUrl, target: '_blank', rel: 'noreferrer' }
              : {};

            return (
              <Card
                key={project.id}
                {...linkProps}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
                className="group block cursor-pointer"
              >
                <div className="relative overflow-hidden border border-line bg-paper-2">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
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
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                  </div>
                  {project.linkUrl ? (
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  ) : (
                    <span className="mt-1 shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted">
                      On request
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
