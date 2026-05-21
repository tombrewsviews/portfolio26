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
      subtitle: 'An internal platform for structuring and tracking advertising deals end to end.',
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
      subtitle: 'A registry for discovering, publishing, and managing AI agent skills.',
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
      subtitle: 'A serverless platform for deploying apps and services globally.',
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
      subtitle: 'AI-assisted code generation and review tooling.',
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
      subtitle: 'Serverless Postgres with branching and instant provisioning.',
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
      subtitle: 'An internal platform for managing complex banking deals.',
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
  },
];
