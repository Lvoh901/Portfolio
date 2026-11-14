// Single source of truth for the portfolio content.
// The server seeds these values into Postgres and the frontend uses them as a
// fallback so the public site still renders if the API is unreachable.

export const defaultCv = {
  key: null,
  filename: 'Elvis Odhiambo_Fullstack Developer.pdf',
  url: '/Elvis Odhiambo_Fullstack Developer.pdf',
  updatedAt: null,
};

export const defaultContent = {
  hero: {
    badge: 'Available for new projects',
    location: 'Nairobi, Kenya',
    headline: 'Beautiful software,',
    accentLine: 'built to do real work.',
    subheadline:
      "I'm Elvis Odhiambo, a full-stack developer and product designer. I take ideas from first sketch to a live, reliable product — for government agencies, telecoms, and businesses that need software to carry their work.",
    clients: [
      { name: 'Land Surveyors’ Board', logoUrl: null, url: 'https://lsb.go.ke/' },
      { name: 'Citikom', logoUrl: null, url: 'https://citikom.co.ke/' },
      { name: 'Survey of Kenya', logoUrl: null, url: 'https://survey-kenya.vercel.app/' },
      { name: 'Intelliworks', logoUrl: null, url: 'https://roy-nine.vercel.app/' },
      { name: 'LeGance', logoUrl: null, url: 'https://curioshop.vercel.app/' },
    ],
  },
  about: {
    heading: 'A developer who designs, and a designer who ships.',
    paragraphs: [
      "I'm Elvis, a full-stack developer and self-taught product designer based in Nairobi. For the past few years I've built platforms for public institutions, telecoms, and small businesses — work that has to be dependable long after launch day.",
      'Because I handle both the design and the code, nothing gets lost in translation between a mockup and a working product. You get one point of contact, honest timelines, and a build you can actually maintain.',
      "When I'm not working, I'm usually exploring type and layout, tinkering with hardware, or taking a long walk with a camera.",
    ],
    facts: [
      { label: 'Based in', value: 'Nairobi, Kenya' },
      { label: 'Working', value: 'On-site & remote' },
      { label: 'Focus', value: 'Web apps & product design' },
    ],
    engineering: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'Laravel',
      'REST APIs',
      'SQL & NoSQL',
      'Tailwind CSS',
      'Vue',
      'Flutter',
    ],
    design: ['UI/UX design', 'Design systems', 'Brand identity', 'Logo design', 'Social media design'],
  },
  contact: {
    email: 'info@odhislvoh.co.ke',
    phone: '+254 718 505 642',
    location: 'Nairobi, Kenya',
    hours: 'Mon–Fri, 8am–5pm EAT',
    responseNote:
      "A short description is enough to start. I'll come back with questions, an honest opinion, and a clear next step — usually within one business day.",
    available: true,
  },
  services: {
    heading: 'One partner from concept to launch.',
    intro:
      'Design and engineering under one roof means fewer handoffs, fewer miscommunications, and a product that looks the way it was promised.',
    items: [
      {
        number: '01',
        title: 'Web & mobile applications',
        description:
          'Custom-built products using React, Next.js, Node and Laravel — engineered to be fast, secure, and easy for your team to run day to day.',
        deliverables: ['Product scoping', 'Front-end & back-end', 'Deployment & handover'],
      },
      {
        number: '02',
        title: 'UI/UX design',
        description:
          'Interfaces your customers can use without a manual. Wireframes, design systems, and prototypes grounded in how the product actually gets used.',
        deliverables: ['User flows', 'Interface design', 'Design system'],
      },
      {
        number: '03',
        title: 'Brand & identity',
        description:
          'Logo, typography, colour and the rules that hold them together — a visual identity that looks credible wherever your brand appears.',
        deliverables: ['Logo suite', 'Brand guidelines', 'Social & print assets'],
      },
      {
        number: '04',
        title: 'Digital product strategy',
        description:
          'An outside perspective before you spend the budget: what to build first, what to leave out, and how the pieces fit together.',
        deliverables: ['Discovery workshop', 'Roadmap', 'Technical review'],
      },
    ],
  },
  process: {
    heading: 'Clear steps. No guesswork.',
    intro:
      "You'll always know what stage we're at, what's next, and what I need from you.",
    steps: [
      {
        number: '01',
        title: 'Discover & align',
        description:
          'A conversation about your goals, your users, and what success looks like. We agree the scope, the budget, and the timeline before anything is built.',
      },
      {
        number: '02',
        title: 'Strategy & preview',
        description:
          'I map the architecture and show you wireframes or mockups. You see the direction — and approve it — before development starts.',
      },
      {
        number: '03',
        title: 'Build & feedback',
        description:
          'Work happens in short, visible stages. You get working previews and regular updates, so there are no surprises at the end.',
      },
      {
        number: '04',
        title: 'Launch & support',
        description:
          'Your product goes live with documentation and a handover session. I stay reachable for fixes and improvements after launch.',
      },
    ],
  },
  cv: defaultCv,
  seo: {
    title: 'Elvis Odhiambo — Full-Stack Developer & Product Designer',
    description:
      'Nairobi-based full-stack developer and product designer building web applications and brand experiences for government agencies, telecoms, and growing businesses.',
  },
  faq: {
    heading: 'Questions before we start?',
    items: [
      {
        q: 'Do you work with clients outside Nairobi?',
        a: 'Yes. Most of my client work is remote — calls, previews, and handover all happen online. I’m based in Nairobi and available for on-site work when needed.',
      },
      {
        q: 'Do you handle both design and development?',
        a: 'Yes. I design the interface and build the product, so nothing gets lost between mockup and code. You get one point of contact for the whole project.',
      },
      {
        q: 'What’s your typical timeline?',
        a: 'It depends on scope. A simple site or brand identity can ship in 2–4 weeks; a custom web application usually runs 6–12 weeks. I’ll give you a realistic timeline after the discovery call.',
      },
      {
        q: 'What happens after launch?',
        a: 'You get documentation and a handover session. I stay reachable for fixes and improvements, and I offer ongoing maintenance if you’d prefer not to manage it in-house.',
      },
      {
        q: 'Do you work with corporate and government clients?',
        a: 'Yes. I’ve built platforms for public institutions and telecoms in Kenya. I’m comfortable with procurement processes, SLAs, and formal handover documentation.',
      },
    ],
  },
};

export const defaultProjects = [
  {
    id: 'lsb',
    title: 'Land Surveyors’ Board',
    category: 'Public sector',
    description:
      'Digital transformation of Kenya’s land surveying practice — a public-facing platform for a national regulatory board.',
    imageUrl: '/work/lsb.webp',
    linkUrl: 'https://lsb.go.ke/',
    stage: 'launched',
    role: 'Product design & full-stack development',
    outcome:
      'Replaced paper-based survey records with a searchable digital platform, cutting application processing time for surveyors nationwide.',
  },
  {
    id: 'citikom',
    title: 'Citikom',
    category: 'Telecommunications',
    description:
      'A modern web presence for a connectivity and network coverage provider, replacing an outdated legacy site.',
    imageUrl: '/work/citikom.webp',
    linkUrl: 'https://citikom.co.ke/',
    stage: 'launched',
    role: 'Product design & front-end development',
    outcome:
      'Migrated from a legacy site to a modern web presence, improving online visibility and customer accessibility for a national connectivity provider.',
  },
  {
    id: 'sok',
    title: 'Survey of Kenya',
    category: 'Public sector',
    description:
      'Platform work for the state department responsible for regulating survey and mapping activity in Kenya.',
    imageUrl: '/work/SoK.webp',
    linkUrl: 'https://survey-kenya.vercel.app/',
    stage: 'in-progress',
    role: 'Full-stack development',
    outcome: 'In development — mapping and survey regulation platform for the state department.',
  },
  {
    id: 'thriftmall',
    title: 'ThriftMall',
    category: 'Commerce',
    description:
      'A buying and selling platform for pre-owned goods, built around simple listing and discovery flows.',
    imageUrl: '/work/thriftmall.webp',
    linkUrl: 'https://thrifmall.vercel.app/',
    stage: 'in-progress',
    role: 'Product design & full-stack development',
    outcome: 'In development — peer-to-peer marketplace for pre-owned goods.',
  },
  {
    id: 'intelliworks',
    title: 'Intelliworks',
    category: 'GeoICT',
    description:
      'Website and product story for a GeoICT firm specialising in data-driven systems and modern software.',
    imageUrl: '/work/intelliworks.webp',
    linkUrl: 'https://roy-nine.vercel.app/',
    stage: 'in-progress',
    role: 'Brand identity & front-end development',
    outcome: 'In development — website and product story for a data-driven GeoICT firm.',
  },
  {
    id: 'legance',
    title: 'LeGance',
    category: 'Retail',
    description:
      'A storefront for handcrafted curios and home pieces, with a catalogue and brand identity that feel considered.',
    imageUrl: '/work/curioshop.webp',
    linkUrl: 'https://curioshop.vercel.app/',
    stage: 'in-progress',
    role: 'Product design & full-stack development',
    outcome: 'In development — online storefront with catalogue and brand identity for handcrafted home pieces.',
  },
  {
    id: 'mindmaze',
    title: 'MindMaze',
    category: 'Product',
    description:
      'A knowledge quiz game with a risk-and-reward twist, powered by an open question API.',
    imageUrl: '/work/mindmaze.webp',
    linkUrl: 'https://mindmaze-riskreward.vercel.app/',
    stage: 'in-progress',
    role: 'Full-stack development',
    outcome: 'In development — knowledge quiz game with risk-and-reward mechanics.',
  },
  {
    id: 'opendata',
    title: 'OpenData Insights',
    category: 'Data',
    description:
      'A dashboard turning open World Bank data into readable trends and patterns for Kenya.',
    imageUrl: '/work/opendata.webp',
    linkUrl: 'https://open-lens-insights.vercel.app/?dataset=economy_inflation_kenya',
    stage: 'in-progress',
    role: 'Full-stack development & data visualization',
    outcome: 'In development — dashboard for exploring World Bank economic data by sector and region.',
  },
  {
    id: 'agency',
    title: 'Agency Site',
    category: 'Studio',
    description:
      'A layout and identity study for a creative agency — services, selected work, and contact in one clean flow.',
    imageUrl: '/work/agency.webp',
    linkUrl: '',
    stage: 'in-progress',
    role: 'Brand identity & layout study',
    outcome: 'Concept study — available as a case study on request.',
  },
];

export const defaultTestimonials = [
  {
    id: 'lsb',
    quote:
      'With Elvis’s expertise in web development and automation, our organisation now runs on a highly efficient digital platform. His commitment got us to operational excellence in record time.',
    author: 'Land Surveyors’ Board Secretariat',
    role: 'Public sector client',
    metric: 'Paper records → digital platform',
  },
  {
    id: 'citikom',
    quote:
      'Elvis transformed our outdated legacy system into a powerful, modern platform. Our business is far more visible and accessible online — and it finally looks like the company we are.',
    author: 'Citikom',
    role: 'Chief Executive Officer',
    metric: 'Legacy system → modern web presence',
  },
  {
    id: 'legance',
    quote:
      'The new site gives our clients a fresh, professional interface that strengthens our brand and builds trust. It has changed how people see the business.',
    author: 'LeGance',
    role: 'Founder',
    metric: 'Brand identity & storefront',
  },
];
