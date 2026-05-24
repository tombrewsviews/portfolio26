import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'adlook',
    projectNumber: '01',
    title: 'Adlook',
    subtitle: 'Internal Deal Platform',
    year: '2026',
    disciplines: ['Solo Product Operator'],
    thumb: '/media/adlook-thumb.jpg',
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
    thumb: '/media/tessl-thumb.jpg',
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
      { heading: 'A package manager for a new primitive', body: 'Skills are a brand-new unit of distribution. The registry had to make them feel as familiar to pin, update, and search as any npm package, without an established mental model to lean on.' },
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
    subtitle: 'Deployment Platform',
    year: '2025',
    disciplines: ['Product Design', 'Developer Tools'],
    thumb: '/media/koyeb-thumb.jpg',
    videoSrc: '/media/koyeb-intro.mp4',
    overview: {
      date: '2025',
      categories: ['Product Design', 'Developer Tools'],
    },
    about:
      'Koyeb lets developers deploy apps globally without managing infrastructure. I redesigned core deployment and monitoring flows.',
    metrics: [
      { value: '1', label: 'global edge deploy UX' },
      { value: '2', label: 'flows redesigned' },
      { value: '1', label: 'faster time-to-first-deploy path' },
    ],
    role: 'Product designer. Redesigned deployment creation and service monitoring.',
    challenges: [
      { heading: 'Infra made simple', body: 'Exposing enough control for power users while keeping the first deploy effortless.' },
      { heading: 'Observability', body: 'Surfacing logs, metrics, and health without a cluttered dashboard.' },
    ],
    shots: [
      { layout: 'full', ratio: '16 / 9', src: '/media/koyeb-deploy.jpg', marker: '[UP]', caption: 'Deploy flow' },
      { layout: 'pair', ratio: '4 / 3', src: '/media/koyeb-regions.jpg', srcB: '/media/koyeb-service.jpg', marker: '[LEFT]', caption: 'Edge regions', markerB: '[RIGHT]', captionB: 'Service view' },
      { layout: 'bleed', ratio: '21 / 9', src: '/media/koyeb-metrics.jpg', marker: '[DOWN]', caption: 'Metrics dashboard' },
      { layout: 'narrow-right', ratio: '1 / 1', src: '/media/koyeb-logs.jpg', marker: '[RIGHT]', caption: 'Live logs' },
    ],
  },
  {
    slug: 'qodo',
    projectNumber: '04',
    title: 'Qodo',
    subtitle: 'AI Code Generation',
    year: '2024',
    disciplines: ['Product Design', 'AI'],
    thumb: '/media/qodo-thumb.jpg',
    videoSrc: '/media/qodo.mp4',
    overview: {
      date: '2024',
      categories: ['Product Design', 'AI'],
    },
    about:
      'Qodo brings AI code generation and review into the developer workflow. I designed the review and PR-agent surfaces.',
    metrics: [
      { value: '1', label: 'PR-native review surface' },
      { value: '1', label: 'inline AI suggestions layer' },
      { value: '2', label: 'surfaces reached (IDE + web)' },
    ],
    role: 'Product designer. Designed AI review and PR-agent interaction patterns.',
    challenges: [
      { heading: 'Trust in AI output', body: 'Designing suggestion UI that invites review rather than blind acceptance.' },
      { heading: 'Workflow fit', body: 'Embedding into existing PR flows without adding friction.' },
    ],
    shots: [
      { layout: 'wide-left', ratio: '16 / 10', src: '/media/qodo-review.jpg', marker: '[LEFT]', caption: 'PR review surface' },
      { layout: 'narrow-right', ratio: '3 / 4', src: '/media/qodo-inline.jpg', marker: '[RIGHT]', caption: 'Inline suggestion' },
      { layout: 'bleed', ratio: '16 / 9', src: '/media/qodo-agent.jpg', marker: '[UP]', caption: 'PR agent' },
      { layout: 'pair', ratio: '4 / 3', src: '/media/qodo-ide.jpg', srcB: '/media/qodo-web.jpg', marker: '[LEFT]', caption: 'IDE panel', markerB: '[RIGHT]', captionB: 'Web app' },
    ],
  },
  {
    slug: 'neon',
    projectNumber: '05',
    title: 'Neon',
    subtitle: 'Serverless Database',
    year: '2024',
    disciplines: ['Product Design', 'Onboarding'],
    thumb: '/media/neon-thumb.jpg',
    videoSrc: '/media/neon-intro.mp4',
    overview: {
      date: '2024',
      categories: ['Product Design', 'Onboarding'],
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
      { layout: 'bleed', ratio: '16 / 9', src: '/media/neon-onboarding.jpg', marker: '[UP]', caption: 'Onboarding' },
      { layout: 'wide-right', ratio: '4 / 3', src: '/media/neon-branching.jpg', marker: '[RIGHT]', caption: 'Branch diagram' },
      { layout: 'pair', ratio: '3 / 4', src: '/media/neon-query.jpg', srcB: '/media/neon-console.jpg', marker: '[LEFT]', caption: 'First query', markerB: '[DOWN RIGHT]', captionB: 'Console' },
      { layout: 'narrow-left', ratio: '1 / 1', src: '/media/neon-empty.jpg', marker: '[LEFT]', caption: 'Empty state' },
    ],
  },
  {
    slug: 'bnp-paribas',
    projectNumber: '06',
    title: 'BNP Paribas',
    subtitle: 'Internal Deal Platform',
    year: '2023',
    disciplines: ['Product Design', 'Enterprise'],
    thumb: '/media/bnp-thumb.jpg',
    videoSrc: '/media/bnp-intro.mp4',
    overview: {
      date: '2023',
      categories: ['Product Design', 'Enterprise'],
    },
    about:
      'For BNP Paribas I designed an internal deal platform handling complex, regulated banking workflows for deal teams.',
    metrics: [
      { value: '1', label: 'enterprise-scale platform' },
      { value: '1', label: 'regulated, compliant flow set' },
      { value: '1', label: 'internal deal platform' },
    ],
    role: 'Product designer. Designed deal workflows within enterprise constraints.',
    challenges: [
      { heading: 'Regulatory constraints', body: 'Designing within strict compliance and audit requirements.' },
      { heading: 'Legacy integration', body: 'Fitting new flows alongside entrenched internal systems.' },
    ],
    shots: [
      { layout: 'full', ratio: '16 / 9', src: '/media/bnp-workflow.jpg', marker: '[UP]', caption: 'Deal workflow' },
      { layout: 'narrow-right', ratio: '3 / 4', src: '/media/bnp-audit.jpg', marker: '[RIGHT]', caption: 'Audit trail' },
      { layout: 'wide-left', ratio: '16 / 10', src: '/media/bnp-dashboard.jpg', marker: '[LEFT]', caption: 'Deal dashboard' },
      { layout: 'pair', ratio: '4 / 3', src: '/media/bnp-compliance.jpg', srcB: '/media/bnp-legacy.jpg', marker: '[LEFT]', caption: 'Compliance step', markerB: '[RIGHT]', captionB: 'Legacy bridge' },
    ],
  },
];
