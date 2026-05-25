import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'adlook',
    projectNumber: '01',
    title: 'Adlook',
    subtitle: 'Internal Deal Platform',
    year: '2026',
    disciplines: ['Solo Product Operator'],
    thumb: '/media/adlook-deal-board.jpg',
    overview: {
      date: '2026',
      categories: ['Internal Financial Platform'],
    },
    about:
      'Adlook needed a single internal surface for deal teams to assemble, price, and track advertising deals. I designed the end-to-end flow and the component system that backs it.',
    metrics: [
      { value: '15x', label: 'faster deal assembly' },
      { value: '100%', label: 'reduction of deal errors' },
      { value: '97%', label: 'UX satisfaction' },
    ],
    role:
      'Lead product designer. Owned research, spec definition, end-to-end flow prototyping, the design system, and frontend implementation, including infrastructure and deployment to production in private Google Cloud VM.',
    challenges: [
      { heading: 'Fragmented tooling', body: 'Deal data lived across spreadsheets and disconnected tools; the platform had to consolidate them without disrupting in-flight deals.' },
      { heading: 'Dense data, clear hierarchy', body: 'Deal screens carry heavy data. The challenge was visual hierarchy that stays legible at density.' },
      { heading: 'No business definition', body: 'There was no written spec. Requirements had to be defined from scratch through research and interviews with the employees who run deals day to day.' },
      { heading: 'Greenfield, no foundations', body: 'No prior software in place — no design system, no internal tooling styleguide, no deployment guidelines. Everything had to be established along the way.' },
      { heading: 'No dedicated team', body: 'There was no engineering or design team to lean on. I operated solo as the design engineer and product operator, owning every layer end to end.' },
    ],
    shots: [
      { layout: 'bleed', ratio: '16 / 9', src: '/media/adlook-deal-board.jpg', marker: '[UP]', caption: 'Deal board', nda: true },
    ],
  },
  {
    slug: 'tessl',
    projectNumber: '02',
    title: 'Tessl',
    subtitle: 'Skills Registry',
    year: '2025–2026',
    disciplines: ['Founding Product Designer / Design Engineer'],
    thumb: '/media/tessl-registry.jpg',
    videoSrc: '/media/tessl-overview.mp4',
    overview: {
      date: '2025–2026',
      categories: ['Developer Platform'],
    },
    about:
      'Tessl Registry is the package manager for agent skills — versioned, evaluated, and secured instructions that tell AI coding agents how to use a library, API, or workflow correctly. I designed the surfaces for discovering, evaluating, publishing, and versioning skills, so developers can find and trust them the way they would any package.',
    metrics: [
      { value: '5', label: 'major pivots over 12 months' },
      { value: '72', label: 'flows designed' },
      { value: '21', label: 'enterprise deals in GTM' },
    ],
    role: 'Product designer. Owned the registry information architecture and the discover, skill-detail, publish, and versioning flows across the web registry and CLI.',
    challenges: [
      { heading: 'Package manager for a new primitive', body: 'Skills are a brand-new unit of distribution. The registry had to make them feel as familiar to pin, update, and search as any npm package, without an established mental model to lean on.' },
      { heading: 'Making quality legible', body: 'Each skill carries a Quality Score, an Impact Score (measurable uplift in agent behaviour), and Snyk security scanning. The detail view had to turn those signals into a clear, trustworthy verdict at a glance.' },
      { heading: 'Trust before install', body: "Skills run with the agent's permissions. The flow had to surface provenance, security, and risk up front — before a developer runs npx tessl i — so installing a community skill never feels like a leap of faith." },
      { heading: 'Web and CLI in lockstep', body: 'Developers discover skills on the web but install and publish from the terminal. The two surfaces had to stay conceptually identical so search, scores, and versions read the same in both.' },
    ],
    shots: [
      { layout: 'full', ratio: '16 / 9', src: '/media/tessl-registry.jpg', marker: '[UP]', caption: 'Registry browse' },
      { layout: 'full', ratio: '16 / 9', src: '/media/tessl-detail.jpg', marker: '[UP]', caption: 'Skill evaluation report' },
      { layout: 'pair', ratio: '16 / 9', src: '/media/tessl-permissions.jpg', srcB: '/media/tessl-cli.jpg', marker: '[LEFT]', caption: 'tessl-audit scores', markerB: '[DOWN RIGHT]', captionB: 'Skill uplift' },
      { layout: 'full', ratio: '4 / 3', src: '/media/tessl-partners.jpg', marker: '[UP]', caption: 'Enterprise-ready partners' },
    ],
  },
  {
    slug: 'koyeb',
    projectNumber: '03',
    title: 'Koyeb',
    subtitle: 'Deployment Platform — Acquired by Mistral AI',
    year: '2024–2025',
    disciplines: ['Lead Product Designer'],
    thumb: '/media/koyeb-website.jpg',
    videoSrc: '/media/koyeb-platform.mp4',
    overview: {
      date: '2024–2025',
      categories: ['Deployment Platform'],
    },
    about:
      'Koyeb lets developers deploy apps globally without managing infrastructure. I redesigned core deployment and monitoring flows, the onboarding flow, the marketing website and branding, and the design system.',
    metrics: [
      { value: '7x', label: 'adoption growth' },
      { value: '3x', label: 'revenue growth' },
      { value: '$50M', label: 'acquisition after redesign' },
    ],
    role: 'As lead product designer, I was contracted to redesign and improve the platform design as well as grow the key metrics. I worked closely with engineering and the CEO as part of a small startup team.',
    challenges: [
      { heading: 'Infra made simple', body: 'Exposing enough control for power users while keeping the first deploy effortless.' },
      { heading: 'Observability', body: 'Surfacing logs, metrics, and health without a cluttered dashboard.' },
      { heading: 'Account abandonment', body: 'Keeping users engaged after sign-up — guiding them into repository integrations so the account turns into a first real deployment.' },
      { heading: 'Converting to paying users', body: 'Lifting conversion to paid with a clearer credit model and a shorter, more intuitive path to deployment.' },
    ],
    shots: [
      { layout: 'full', ratio: '3 / 2', src: '/media/koyeb-website.jpg', marker: '[UP]', caption: 'Marketing site' },
      { layout: 'pair', ratio: '3 / 2', src: '/media/koyeb-onboard-deploy.jpg', srcB: '/media/koyeb-onboard-models.jpg', marker: '[LEFT]', caption: 'Onboarding · performance', markerB: '[DOWN RIGHT]', captionB: 'Onboarding · model' },
      { layout: 'bleed', ratio: '3 / 2', src: '/media/koyeb-services.jpg', marker: '[UP]', caption: 'Services dashboard' },
      { layout: 'pair', ratio: '3 / 2', src: '/media/koyeb-signup.jpg', srcB: '/media/koyeb-gpu.jpg', marker: '[LEFT]', caption: 'Sign-up flow', markerB: '[DOWN RIGHT]', captionB: 'GPU deployment' },
    ],
  },
  {
    slug: 'qodo',
    projectNumber: '04',
    title: 'Qodo',
    subtitle: 'AI Code Generation',
    year: '2022–2025',
    disciplines: ['Founding Product Designer / Design Engineer'],
    thumb: '/media/qodo-platform-hero.jpg',
    videoSrc: '/media/qodo-platform.mp4',
    overview: {
      date: '2022–2025',
      categories: ['Agentic Developer Platform'],
    },
    about:
      'Qodo brings AI code generation and review into the developer workflow, with the first agents designed in the terminal before Claude Code was released. The work spanned the review and PR-agent surfaces, AI research and model fine-tuning, and on-prem deployment for a large customer base.',
    metrics: [
      { value: '2M', label: 'agent installs' },
      { value: '4M', label: 'PR reviews' },
      { value: '500K', label: 'users' },
    ],
    role: 'Founding product designer, from zero to 300K installs in a year. Solo designer across every touchpoint, and a design engineer in the production codebase, polishing the execution and shipping features end to end.',
    challenges: [
      { heading: 'Trust in AI output', body: 'Designing suggestion UI that invites review rather than blind acceptance.' },
      { heading: 'Workflow fit', body: 'Embedding into existing PR flows without adding friction.' },
      { heading: 'On-prem', body: 'Monitoring and iterating on features from both the product and engineering side, inside customer-controlled environments.' },
      { heading: 'Agentic behaviour', body: 'Designing flows and tool calls for a non-deterministic chat state, where the same input can take different paths.' },
      { heading: 'Platform management', body: 'Comprehensive user and resource management, including the context and prompt engineering that drives the agents.' },
      { heading: 'Pace of the space', body: 'Competing in a field that reinvents itself continuously, at incredible speed.' },
    ],
    shots: [
      { layout: 'full', ratio: '16 / 9', src: '/media/qodo-platform-hero.jpg', marker: '[UP]', caption: 'One platform for every review workflow' },
      { layout: 'full', ratio: '16 / 9', video: '/media/qodo.mp4', marker: '[UP]', caption: 'Code review walkthrough' },
      { layout: 'pair', ratio: '3 / 4', src: '/media/qodo-test-agent.jpg', srcB: '/media/qodo-behaviors.jpg', marker: '[LEFT]', caption: 'Test agent', markerB: '[DOWN RIGHT]', captionB: 'Generate tests from behaviors' },
      { layout: 'full', ratio: '5 / 4', src: '/media/qodo-coverage.jpg', marker: '[UP]', caption: 'Coverage & quality' },
    ],
  },
  {
    slug: 'neon',
    projectNumber: '05',
    title: 'Neon',
    subtitle: 'Serverless Database — Acquired by Databricks',
    year: '2022–2024',
    disciplines: ['Product Design', 'Onboarding'],
    thumb: '/media/neon-create.jpg',
    videoSrc: '/media/neon-platform.mp4',
    overview: {
      date: '2022–2024',
      categories: ['Serverless Database Platform'],
      roleLabel: 'Lead Product Designer / Design Engineer',
    },
    about:
      'Neon is serverless Postgres with database branching. I redesigned the onboarding to get developers to a live database fast.',
    metrics: [
      { value: '1', label: 'faster time-to-first-query path' },
      { value: '1', label: 'branching made visible' },
      { value: '1', label: 'onboarding redesigned' },
    ],
    role: 'Product designer. Led the onboarding redesign.',
    challenges: [
      { heading: 'Explaining branching', body: 'Database branching is novel; onboarding had to teach it without a wall of docs.' },
      { heading: 'Fast first value', body: 'Getting users to a working query in minutes.' },
    ],
    shots: [
      { layout: 'full', ratio: '3 / 2', src: '/media/neon-create.jpg', marker: '[UP]', caption: 'Create new project' },
      { layout: 'full', ratio: '3 / 2', src: '/media/neon-quickstart.jpg', marker: '[UP]', caption: 'Quick start' },
      { layout: 'bleed', ratio: '21 / 9', src: '/media/neon-metrics.jpg', marker: '[UP]', caption: 'Storage & compute metrics' },
      { layout: 'bleed', ratio: '21 / 9', src: '/media/neon-compute.jpg', marker: '[UP]', caption: 'Compute autoscaling' },
    ],
  },
  {
    slug: 'bnp-paribas',
    projectNumber: '06',
    title: 'BNP Paribas',
    subtitle: 'Internal Deal Platform',
    year: '2021–2023',
    disciplines: ['Product Design', 'Enterprise'],
    thumb: '/media/bnp-securities.jpg',
    overview: {
      date: '2021–2023',
      categories: ['Internal Investment Platform'],
      roleLabel: 'Lead Product Designer',
    },
    about:
      'BNP Paribas ran a massive internal initiative to unify three major, disjointed investment deal systems spanning multiple departments and business groups. They needed a single backend, data layer, and frontend to operate on that data — supporting over $1 trillion in assets managed each year across customer deals and investments.',
    metrics: [
      { value: '300×', label: 'efficiency improvement' },
      { value: '98%', label: 'data error removal' },
      { value: '$700M', label: 'assets in 12 months' },
    ],
    role: 'As lead product designer, I owned the design process end to end — from UX research through to high-fidelity interface design.',
    challenges: [
      { heading: 'Regulatory constraints', body: 'Designing within strict compliance and audit requirements.' },
      { heading: 'Legacy integration', body: 'Fitting new flows alongside entrenched internal systems.' },
      { heading: 'Communication and governance', body: 'Managing 72 product stakeholders and continually changing requirements.' },
      { heading: 'Technical stack upgrade', body: 'The design had to work with the existing stack while accounting for upgrades built specifically for this project — a new data lake and a new endpoint architecture.' },
      { heading: 'New design system', body: 'Stakeholders were open to modernizing the design system and frontend architecture, so my role was to audit, introduce, and improve design patterns.' },
    ],
    shots: [
      { layout: 'bleed', ratio: '3 / 2', src: '/media/bnp-securities.jpg', marker: '[UP]', caption: 'Securities confirmation', nda: true },
    ],
  },
];
