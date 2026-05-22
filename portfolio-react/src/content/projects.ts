import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'adlook',
    projectNumber: '01',
    title: 'Adlook',
    subtitle: 'Internal Deal Platform',
    year: '2026',
    disciplines: ['Product Design', 'Design System', 'Frontend'],
    thumb: '/media/adlook-thumb.jpg',
    videoSrc: '/media/adlook-intro.mp4',
    overview: {
      date: '2026',
      categories: ['Product Design', 'Design System'],
    },
    about:
      'Adlook needed a single internal surface for deal teams to assemble, price, and track advertising deals. I designed the end-to-end flow and the component system that backs it.',
    metrics: [
      { value: '40%', label: 'faster deal assembly' },
      { value: '1', label: 'unified deal surface' },
      { value: '0→system', label: 'design system established' },
    ],
    role:
      'Lead product designer. Owned research, end-to-end flows, the design system, and frontend collaboration.',
    challenges: [
      { heading: 'Fragmented tooling', body: 'Deal data lived across spreadsheets and disconnected tools; the platform had to consolidate them without disrupting in-flight deals.' },
      { heading: 'Dense data, clear hierarchy', body: 'Deal screens carry heavy data. The challenge was visual hierarchy that stays legible at density.' },
    ],
    shots: [
      { layout: 'bleed', ratio: '16 / 9', src: '/media/adlook-deal-board.jpg', marker: '[UP]', caption: 'Deal board' },
      { layout: 'wide-left', ratio: '4 / 3', src: '/media/adlook-pricing.jpg', marker: '[LEFT]', caption: 'Pricing builder' },
      { layout: 'pair', ratio: '3 / 4', src: '/media/adlook-detail.jpg', srcB: '/media/adlook-tracking.jpg', marker: '[LEFT]', caption: 'Deal detail', markerB: '[RIGHT]', captionB: 'Tracking view' },
      { layout: 'narrow-right', ratio: '1 / 1', src: '/media/adlook-token.jpg', marker: '[RIGHT]', caption: 'Design tokens' },
    ],
  },
  {
    slug: 'tessl',
    projectNumber: '02',
    title: 'Tessl',
    subtitle: 'Skills Registry',
    year: '2025',
    disciplines: ['Product Design', 'Developer Tools'],
    thumb: '/media/tessl-thumb.jpg',
    videoSrc: '/media/tessl-intro.mp4',
    overview: {
      date: '2025',
      categories: ['Product Design', 'Developer Tools'],
    },
    about:
      'Tessl Skills Registry is where developers discover, publish, and version skills for AI agents. I designed the registry browsing, detail, and publishing flows.',
    metrics: [
      { value: '3', label: 'core flows shipped' },
      { value: 'registry', label: 'discovery surface' },
      { value: 'CLI+web', label: 'parity' },
    ],
    role: 'Product designer. Owned the registry IA, browsing, and publish flows.',
    challenges: [
      { heading: 'Developer trust', body: 'Skills run with agent permissions; the UI had to surface provenance and risk clearly before install.' },
      { heading: 'Versioning clarity', body: 'Showing version history and compatibility without overwhelming the browse experience.' },
    ],
    shots: [
      { layout: 'wide-right', ratio: '16 / 10', src: '/media/tessl-registry.jpg', marker: '[RIGHT]', caption: 'Registry browse' },
      { layout: 'full', ratio: '16 / 9', src: '/media/tessl-detail.jpg', marker: '[UP]', caption: 'Skill detail' },
      { layout: 'narrow-left', ratio: '3 / 4', src: '/media/tessl-permissions.jpg', marker: '[LEFT]', caption: 'Permission gate' },
      { layout: 'pair', ratio: '4 / 3', src: '/media/tessl-publish.jpg', srcB: '/media/tessl-versions.jpg', marker: '[LEFT]', caption: 'Publish flow', markerB: '[DOWN RIGHT]', captionB: 'Version history' },
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
      { value: 'global', label: 'edge deploy UX' },
      { value: '2', label: 'flows redesigned' },
      { value: 'faster', label: 'time to first deploy' },
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
    videoSrc: '/media/qodo-intro.mp4',
    overview: {
      date: '2024',
      categories: ['Product Design', 'AI'],
    },
    about:
      'Qodo brings AI code generation and review into the developer workflow. I designed the review and PR-agent surfaces.',
    metrics: [
      { value: 'PR-native', label: 'review surface' },
      { value: 'inline', label: 'AI suggestions' },
      { value: 'IDE+web', label: 'reach' },
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
      { value: 'faster', label: 'time to first query' },
      { value: 'branching', label: 'made visible' },
      { value: 'onboarding', label: 'redesigned' },
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
      { value: 'enterprise', label: 'scale' },
      { value: 'regulated', label: 'compliant flows' },
      { value: 'internal', label: 'deal platform' },
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
