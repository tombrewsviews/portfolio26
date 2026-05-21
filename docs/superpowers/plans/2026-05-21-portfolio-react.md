# Portfolio React App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React/Vercel portfolio organized like marinkurir.com — a typographic work list linking to dedicated case-study routes, a Studio-Rotate-style horizontal banner, RobotoFlex weight-on-scroll, pretext kinetic type, Lenis + GSAP smooth scroll, and Remotion (placeholder videos).

**Architecture:** Content-as-data: all copy lives in `src/content/*.ts`, so the case-study page is one generic template driven by the route slug. A shared animation layer (`src/lib/`) initializes Lenis + GSAP ScrollTrigger once, app-wide, and exposes a single weight-on-scroll mapping so motion is consistent. Single-column-first responsive CSS reflows to mobile with no separate design. TDD is applied to the data + routing logic (Vitest); visual components are gated by type-check, build, and manual verification.

**Tech Stack:** Vite + React + TypeScript, React Router, Vitest, Lenis (`lenis/react`), GSAP + ScrollTrigger, pretext (`@chenglou/pretext`), Remotion, self-hosted RobotoFlex variable font, Vercel.

**Spec:** `docs/superpowers/specs/2026-05-21-portfolio-react-design.md`

**Working directory:** All paths below are relative to the new app folder `portfolio-react/` at the repo root, except where a path is shown starting from the repo root.

---

## File Structure

Created/modified across tasks:

```
portfolio-react/
├── package.json                  # T1
├── vite.config.ts                # T1 (vitest config inline)
├── tsconfig.json                 # T1
├── tsconfig.node.json            # T1
├── vercel.json                   # T1
├── index.html                    # T1
├── .gitignore                    # T1
├── public/fonts/RobotoFlex.woff2 # T2
├── src/
│   ├── main.tsx                  # T3
│   ├── App.tsx                   # T9 (router)
│   ├── index.css                 # T2 (tokens, font-face, reset, reduced-motion)
│   ├── types.ts                  # T4
│   ├── content/
│   │   ├── projects.ts           # T4
│   │   ├── projects.test.ts      # T4
│   │   ├── experiments.ts        # T5
│   │   ├── creative.ts           # T5
│   │   ├── shaped.ts             # T5
│   │   ├── socials.ts            # T5
│   │   ├── sources.ts            # T5
│   │   ├── lookup.ts             # T6 (getProject)
│   │   └── lookup.test.ts        # T6
│   ├── lib/
│   │   ├── smoothScroll.tsx      # T7 (Lenis + GSAP provider)
│   │   ├── flexAnim.ts           # T8 (weight-on-scroll mapping)
│   │   └── flexAnim.test.ts      # T8
│   ├── components/
│   │   ├── FlexText.tsx          # T10
│   │   ├── Reveal.tsx            # T11
│   │   ├── Nav.tsx               # T12
│   │   ├── Hero.tsx              # T13
│   │   ├── CreativeBanner.tsx    # T14
│   │   ├── About.tsx             # T15
│   │   ├── WorkList.tsx          # T16
│   │   ├── ExperimentsList.tsx   # T17
│   │   ├── WhatShapedMe.tsx      # T18
│   │   ├── Footer.tsx            # T19
│   │   └── case/
│   │       ├── CaseHero.tsx      # T21
│   │       ├── VideoIntro.tsx    # T21
│   │       ├── Overview.tsx      # T21
│   │       ├── MetricsGrid.tsx   # T21
│   │       ├── RoleBlock.tsx     # T21
│   │       └── Challenges.tsx    # T21
│   ├── pages/
│   │   ├── Home.tsx              # T20
│   │   ├── CaseStudy.tsx         # T22
│   │   └── NotFound.tsx          # T9
│   └── remotion/
│       └── Root.tsx              # T23
```

---

## Task 1: Scaffold Vite + React + TS project with Vitest

**Files:**
- Create: `portfolio-react/package.json`
- Create: `portfolio-react/vite.config.ts`
- Create: `portfolio-react/tsconfig.json`
- Create: `portfolio-react/tsconfig.node.json`
- Create: `portfolio-react/index.html`
- Create: `portfolio-react/vercel.json`
- Create: `portfolio-react/.gitignore`
- Create: `portfolio-react/src/main.tsx` (temporary smoke entry, replaced in T3)
- Create: `portfolio-react/src/App.tsx` (temporary, replaced in T9)

- [ ] **Step 1: Create package.json**

```json
{
  "name": "portfolio-react",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "lenis": "^1.1.13",
    "gsap": "^3.12.5",
    "@chenglou/pretext": "^0.0.3"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.6",
    "vitest": "^2.1.1",
    "jsdom": "^25.0.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/jest-dom": "^6.5.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create vite.config.ts (with vitest config)**

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
});
```

- [ ] **Step 5: Create index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tom Parandyk — Founding Designer & Full-Stack Builder</title>
    <meta name="description" content="Product design case studies and design-engineering experiments by Tom Parandyk." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create vercel.json (SPA rewrite)**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 7: Create .gitignore**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 8: Create temporary src/main.tsx**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 9: Create temporary src/App.tsx**

```tsx
export default function App() {
  return <div>Portfolio scaffold</div>;
}
```

- [ ] **Step 10: Install dependencies**

Run: `cd portfolio-react && npm install`
Expected: dependencies install, `node_modules/` created, no peer-dep errors that block.

- [ ] **Step 11: Verify build and dev server start**

Run: `cd portfolio-react && npm run build`
Expected: `tsc -b` passes, `vite build` writes `dist/`, exit code 0.

- [ ] **Step 12: Commit**

```bash
git add portfolio-react/package.json portfolio-react/package-lock.json portfolio-react/vite.config.ts portfolio-react/tsconfig.json portfolio-react/tsconfig.node.json portfolio-react/index.html portfolio-react/vercel.json portfolio-react/.gitignore portfolio-react/src/main.tsx portfolio-react/src/App.tsx
git commit -m "chore: scaffold portfolio-react Vite + React + TS + Vitest"
```

---

## Task 2: Font, CSS tokens, reset, reduced-motion

**Files:**
- Create: `portfolio-react/public/fonts/RobotoFlex.woff2`
- Create: `portfolio-react/src/index.css`

- [ ] **Step 1: Download RobotoFlex variable font**

Run:
```bash
cd portfolio-react && mkdir -p public/fonts && curl -L -o public/fonts/RobotoFlex.woff2 "https://github.com/google/fonts/raw/main/ofl/robotoflex/RobotoFlex%5BGRAD%2CXOPQ%2CXTRA%2CYOPQ%2CYTAS%2CYTDE%2CYTFI%2CYTLC%2CYTUC%2Copsz%2Cslnt%2Cwdth%2Cwght%5D.ttf"
```
Note: Google ships RobotoFlex as a `.ttf` variable font. Save it but rename target to `.ttf` if `.woff2` is unavailable. If the curl above yields a `.ttf`, update the filename in this step and in the `@font-face` `src` below to `RobotoFlex.ttf` with `format('truetype')`.
Expected: a non-empty font file in `public/fonts/`. Verify: `ls -la public/fonts/` shows a file > 100 KB.

- [ ] **Step 2: Create src/index.css with font-face, tokens, reset, reduced-motion**

```css
@font-face {
  font-family: 'Roboto Flex';
  src: url('/fonts/RobotoFlex.ttf') format('truetype');
  font-weight: 100 1000;
  font-stretch: 25% 151%;
  font-display: swap;
}

:root {
  --bg: #0a0a0a;
  --fg: #f4f4f2;
  --muted: #9a9a96;
  --line: #2a2a2a;
  --maxw: 80rem;
  --pad: clamp(1.25rem, 5vw, 4rem);
  --gap: clamp(1rem, 3vw, 2rem);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { -webkit-text-size-adjust: 100%; }

body {
  background: var(--bg);
  color: var(--fg);
  font-family: 'Roboto Flex', system-ui, sans-serif;
  font-weight: 400;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; height: auto; }

.container { max-width: var(--maxw); margin-inline: auto; padding-inline: var(--pad); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verify build still passes**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 4: Commit**

```bash
git add portfolio-react/public/fonts portfolio-react/src/index.css
git commit -m "feat: add RobotoFlex font, CSS tokens, reset, reduced-motion"
```

---

## Task 3: Wire global CSS into entry

**Files:**
- Modify: `portfolio-react/src/main.tsx`

- [ ] **Step 1: Import index.css and lenis css in main.tsx**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/main.tsx
git commit -m "feat: load global and lenis css in entry"
```

---

## Task 4: Types + projects content (TDD)

**Files:**
- Create: `portfolio-react/src/types.ts`
- Create: `portfolio-react/src/content/projects.ts`
- Test: `portfolio-react/src/content/projects.test.ts`

- [ ] **Step 1: Write src/types.ts**

```ts
export type Metric = { value: string; label: string };
export type Challenge = { heading: string; body: string };

export type Project = {
  slug: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  year: string;
  disciplines: string[];
  thumb: string;
  videoSrc: string;
  overview: { date: string; categories: string[]; subtitle: string };
  about: string;
  metrics: Metric[];
  role: string;
  challenges: Challenge[];
};

export type Experiment = {
  title: string;
  description: string;
  links: { label: string; href: string }[];
};

export type ShapedGroup = {
  key: string;
  items: { name: string; note: string }[];
};

export type Social = { label: string; href: string };
export type Source = { name: string; href: string; note: string };
```

- [ ] **Step 2: Write the failing test (projects.test.ts)**

```ts
import { describe, it, expect } from 'vitest';
import { projects } from './projects';

describe('projects content', () => {
  it('has exactly 6 projects in newest-to-oldest order', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'adlook', 'tessl', 'koyeb', 'qodo', 'neon', 'bnp-paribas',
    ]);
  });

  it('every project has all required non-empty fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.projectNumber).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.subtitle).toBeTruthy();
      expect(p.year).toBeTruthy();
      expect(p.disciplines.length).toBeGreaterThan(0);
      expect(p.about).toBeTruthy();
      expect(p.metrics.length).toBeGreaterThan(0);
      expect(p.role).toBeTruthy();
      expect(p.challenges.length).toBeGreaterThan(0);
      expect(p.overview.categories.length).toBeGreaterThan(0);
    }
  });

  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd portfolio-react && npx vitest run src/content/projects.test.ts`
Expected: FAIL — cannot resolve `./projects`.

- [ ] **Step 4: Write src/content/projects.ts**

Use placeholder-but-real copy (text is editable later; fields must be non-empty). `thumb` and `videoSrc` point to placeholder paths under `/media/` that need not exist yet.

```ts
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd portfolio-react && npx vitest run src/content/projects.test.ts`
Expected: PASS — all 3 tests green.

- [ ] **Step 6: Commit**

```bash
git add portfolio-react/src/types.ts portfolio-react/src/content/projects.ts portfolio-react/src/content/projects.test.ts
git commit -m "feat: add content types and projects data with tests"
```

---

## Task 5: Remaining content data (experiments, creative, shaped, socials, sources)

**Files:**
- Create: `portfolio-react/src/content/experiments.ts`
- Create: `portfolio-react/src/content/creative.ts`
- Create: `portfolio-react/src/content/shaped.ts`
- Create: `portfolio-react/src/content/socials.ts`
- Create: `portfolio-react/src/content/sources.ts`

- [ ] **Step 1: Write experiments.ts**

```ts
import type { Experiment } from '../types';

export const experiments: Experiment[] = [
  {
    title: 'Stackpack Debug',
    description: 'A closed-loop debugging toolkit for AI agents: investigate, instrument, capture, verify, remember.',
    links: [{ label: 'GitHub', href: 'https://github.com/tombrewsviews/debug-toolkit' }],
  },
  {
    title: 'Claude Skills',
    description: 'A set of over 10 custom Claude Code skills extending agent capability across design and engineering.',
    links: [{ label: 'Source', href: 'https://github.com/tombrewsviews' }],
  },
  {
    title: 'BYOA + Kinetic Type',
    description: 'Bring-your-own-agent experiments paired with kinetic typography explorations.',
    links: [{ label: 'Medium', href: 'https://medium.com/@tomparandyk' }],
  },
];
```

- [ ] **Step 2: Write creative.ts**

`src` paths are placeholders under `/media/`; they need not exist for the build. Captions are real.

```ts
export const creative: { src: string; caption: string }[] = [
  { src: '/media/creative-01.jpg', caption: 'Creative work 01' },
  { src: '/media/creative-02.jpg', caption: 'Creative work 02' },
  { src: '/media/creative-03.jpg', caption: 'Creative work 03' },
  { src: '/media/creative-04.jpg', caption: 'Creative work 04' },
  { src: '/media/creative-05.jpg', caption: 'Creative work 05' },
  { src: '/media/creative-06.jpg', caption: 'Creative work 06' },
];
```

- [ ] **Step 3: Write shaped.ts**

```ts
import type { ShapedGroup } from '../types';

export const shaped: ShapedGroup[] = [
  {
    key: '// creative_practice',
    items: [
      { name: 'Photography', note: 'light, composition, patience' },
      { name: 'Cinematography', note: 'motion, frame, story' },
      { name: 'Music Composition', note: 'structure beneath feeling' },
      { name: 'Design History', note: 'form follows function follows culture' },
    ],
  },
  {
    key: '// athletic_disciplines',
    items: [
      { name: 'Fencing (epee)', note: 'chess at blade speed' },
      { name: 'Ice Hockey', note: 'controlled chaos on ice' },
      { name: 'Table Tennis', note: 'reaction over strategy' },
      { name: 'Strength Training', note: 'the discipline compounds' },
      { name: 'Swimming', note: 'the best kind of silence' },
      { name: 'Badminton', note: 'new · terrible · obsessed' },
    ],
  },
  {
    key: '// foundation',
    items: [
      { name: 'Father of Three', note: 'the reason I build things that last' },
      { name: 'Meditation', note: 'not a hobby — infrastructure' },
      { name: "Beginner's Mind", note: 'protected at all costs' },
      { name: 'Audiobooks', note: 'always something in my ears' },
    ],
  },
];
```

- [ ] **Step 4: Write socials.ts**

```ts
import type { Social } from '../types';

export const socials: Social[] = [
  { label: 'Medium', href: 'https://medium.com/@tomparandyk' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tmass/' },
  { label: 'Dribbble', href: 'https://dribbble.com/tmass' },
];
```

- [ ] **Step 5: Write sources.ts**

```ts
import type { Source } from '../types';

export const sources: Source[] = [
  { name: 'frontend-design', href: 'https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design', note: 'distinctive production-grade UI' },
  { name: 'impeccable', href: 'https://claude.com/claude-code', note: 'hierarchy, motion, polish' },
  { name: 'refactoring-ui', href: 'https://github.com/wondelai/skills', note: 'spacing, color, depth' },
  { name: 'web-typography', href: 'https://github.com/wondelai/skills', note: 'variable fonts, type scale' },
  { name: 'ux-heuristics', href: 'https://github.com/wondelai/skills', note: "Nielsen's 10 heuristics" },
  { name: 'visual-hierarchy-refactoring', href: 'https://claude.com/claude-code', note: 'size/weight/contrast/whitespace' },
  { name: 'design-taste-frontend', href: 'https://claude.com/claude-code', note: 'metric-based rules, CSS accel' },
  { name: 'awesome-design', href: 'https://claude.com/claude-code', note: 'proven design languages' },
  { name: 'emilkowal-animations', href: 'https://emilkowal.ski/', note: 'tasteful easing & transitions' },
  { name: 'remotion-best-practices', href: 'https://www.remotion.dev/', note: 'Remotion patterns' },
  { name: 'video-to-website', href: 'https://claude.com/claude-code', note: 'scroll-driven site patterns' },
  { name: 'ui-skills', href: 'https://claude.com/claude-code', note: 'interface constraints' },
  { name: 'foresight', href: 'https://github.com/tombrewsviews', note: 'post-implementation lookahead' },
  { name: 'Claude Code', href: 'https://claude.com/claude-code', note: 'the build agent' },
];
```

- [ ] **Step 6: Verify type-check passes**

Run: `cd portfolio-react && npx tsc -b`
Expected: exit code 0, no type errors.

- [ ] **Step 7: Commit**

```bash
git add portfolio-react/src/content/experiments.ts portfolio-react/src/content/creative.ts portfolio-react/src/content/shaped.ts portfolio-react/src/content/socials.ts portfolio-react/src/content/sources.ts
git commit -m "feat: add experiments, creative, shaped, socials, sources content"
```

---

## Task 6: Project lookup helper (TDD)

**Files:**
- Create: `portfolio-react/src/content/lookup.ts`
- Test: `portfolio-react/src/content/lookup.test.ts`

- [ ] **Step 1: Write the failing test (lookup.test.ts)**

```ts
import { describe, it, expect } from 'vitest';
import { getProject } from './lookup';

describe('getProject', () => {
  it('returns the project for a known slug', () => {
    const p = getProject('adlook');
    expect(p?.title).toBe('Adlook');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProject('does-not-exist')).toBeUndefined();
  });

  it('returns undefined for an empty slug', () => {
    expect(getProject('')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd portfolio-react && npx vitest run src/content/lookup.test.ts`
Expected: FAIL — cannot resolve `./lookup`.

- [ ] **Step 3: Write src/content/lookup.ts**

```ts
import type { Project } from '../types';
import { projects } from './projects';

export function getProject(slug: string): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd portfolio-react && npx vitest run src/content/lookup.test.ts`
Expected: PASS — all 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add portfolio-react/src/content/lookup.ts portfolio-react/src/content/lookup.test.ts
git commit -m "feat: add getProject lookup helper with tests"
```

---

## Task 7: Smooth-scroll provider (Lenis + GSAP)

**Files:**
- Create: `portfolio-react/src/lib/smoothScroll.tsx`

- [ ] **Step 1: Write src/lib/smoothScroll.tsx**

Uses the canonical Lenis-React + GSAP ScrollTrigger sync (autoRaf off, drive raf from GSAP ticker). Registers ScrollTrigger once.

```tsx
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenisRef.current?.lenis?.on('scroll', onScroll);

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current?.lenis?.off('scroll', onScroll);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `cd portfolio-react && npx tsc -b`
Expected: exit code 0. If `LenisRef` is not exported by the installed `lenis/react` version, replace the import with `type LenisRef = React.ComponentRef<typeof ReactLenis>` derived inline, or use `useRef<any>(null)` as a fallback; re-run tsc until it passes.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/lib/smoothScroll.tsx
git commit -m "feat: add Lenis + GSAP smooth-scroll provider"
```

---

## Task 8: Weight-on-scroll mapping (TDD)

**Files:**
- Create: `portfolio-react/src/lib/flexAnim.ts`
- Test: `portfolio-react/src/lib/flexAnim.test.ts`

- [ ] **Step 1: Write the failing test (flexAnim.test.ts)**

```ts
import { describe, it, expect } from 'vitest';
import { weightForProgress, FLEX_MIN, FLEX_MAX } from './flexAnim';

describe('weightForProgress', () => {
  it('returns FLEX_MIN at progress 0', () => {
    expect(weightForProgress(0)).toBe(FLEX_MIN);
  });

  it('returns FLEX_MAX at progress 1', () => {
    expect(weightForProgress(1)).toBe(FLEX_MAX);
  });

  it('returns the midpoint weight at progress 0.5', () => {
    expect(weightForProgress(0.5)).toBe((FLEX_MIN + FLEX_MAX) / 2);
  });

  it('clamps progress below 0 to FLEX_MIN', () => {
    expect(weightForProgress(-1)).toBe(FLEX_MIN);
  });

  it('clamps progress above 1 to FLEX_MAX', () => {
    expect(weightForProgress(5)).toBe(FLEX_MAX);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd portfolio-react && npx vitest run src/lib/flexAnim.test.ts`
Expected: FAIL — cannot resolve `./flexAnim`.

- [ ] **Step 3: Write src/lib/flexAnim.ts**

```ts
export const FLEX_MIN = 300;
export const FLEX_MAX = 900;

// Shared scroll-choreography constants so motion is consistent site-wide.
export const REVEAL = {
  duration: 0.9,
  ease: 'power3.out',
  y: 24,
  stagger: 0.08,
} as const;

export function weightForProgress(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return FLEX_MIN + (FLEX_MAX - FLEX_MIN) * p;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd portfolio-react && npx vitest run src/lib/flexAnim.test.ts`
Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add portfolio-react/src/lib/flexAnim.ts portfolio-react/src/lib/flexAnim.test.ts
git commit -m "feat: add weight-on-scroll mapping and shared motion config"
```

---

## Task 9: Router + NotFound

**Files:**
- Modify: `portfolio-react/src/App.tsx`
- Create: `portfolio-react/src/pages/NotFound.tsx`
- Create temporary stubs: `portfolio-react/src/pages/Home.tsx`, `portfolio-react/src/pages/CaseStudy.tsx` (replaced in T20/T22)

- [ ] **Step 1: Create temporary Home.tsx stub**

```tsx
export default function Home() {
  return <main className="container">Home</main>;
}
```

- [ ] **Step 2: Create temporary CaseStudy.tsx stub**

```tsx
import { useParams } from 'react-router-dom';

export default function CaseStudy() {
  const { slug } = useParams();
  return <main className="container">Case study: {slug}</main>;
}
```

- [ ] **Step 3: Create NotFound.tsx**

```tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container" style={{ paddingBlock: '20vh' }}>
      <h1 style={{ fontWeight: 800 }}>404</h1>
      <p style={{ color: 'var(--muted)' }}>That page doesn’t exist.</p>
      <Link to="/" style={{ textDecoration: 'underline' }}>Back home</Link>
    </main>
  );
}
```

- [ ] **Step 4: Rewrite App.tsx with router + SmoothScroll + ScrollToTop**

```tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SmoothScroll } from './lib/smoothScroll';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add portfolio-react/src/App.tsx portfolio-react/src/pages/Home.tsx portfolio-react/src/pages/CaseStudy.tsx portfolio-react/src/pages/NotFound.tsx
git commit -m "feat: add router, smooth-scroll wrapper, scroll-to-top, 404"
```

---

## Task 10: FlexText component (RobotoFlex weight-on-scroll)

**Files:**
- Create: `portfolio-react/src/components/FlexText.tsx`

- [ ] **Step 1: Write FlexText.tsx**

Animates `font-variation-settings` `wght` from FLEX_MIN→FLEX_MAX as the element scrolls through the viewport, scrubbed via ScrollTrigger. Respects reduced motion by rendering static FLEX_MAX.

```tsx
import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLEX_MIN, FLEX_MAX } from '../lib/flexAnim';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function FlexText({ as: Tag = 'span', children, className, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.style.fontVariationSettings = `"wght" ${FLEX_MAX}`;
      return;
    }

    const obj = { w: FLEX_MIN };
    el.style.fontVariationSettings = `"wght" ${FLEX_MIN}`;

    const tween = gsap.to(obj, {
      w: FLEX_MAX,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
      },
      onUpdate: () => {
        el.style.fontVariationSettings = `"wght" ${Math.round(obj.w)}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `cd portfolio-react && npx tsc -b`
Expected: exit code 0. If `ref` typing on a dynamic `Tag` errors, cast with `ref={ref as React.Ref<any>}`; re-run tsc until clean.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/FlexText.tsx
git commit -m "feat: add FlexText weight-on-scroll component"
```

---

## Task 11: Reveal component (on-scroll reveal)

**Files:**
- Create: `portfolio-react/src/components/Reveal.tsx`

- [ ] **Step 1: Write Reveal.tsx**

```tsx
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REVEAL } from '../lib/flexAnim';

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const tween = gsap.from(el, {
      opacity: 0,
      y: REVEAL.y,
      duration: REVEAL.duration,
      ease: REVEAL.ease,
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `cd portfolio-react && npx tsc -b`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/Reveal.tsx
git commit -m "feat: add Reveal on-scroll component"
```

---

## Task 12: Nav

**Files:**
- Create: `portfolio-react/src/components/Nav.tsx`

- [ ] **Step 1: Write Nav.tsx**

```tsx
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBlock: '1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        backdropFilter: 'blur(8px)',
        mixBlendMode: 'difference',
      }}
    >
      <Link to="/" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
        Tom Parandyk
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        <a href="#about">About</a>
        <a href="#work">Work</a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify type-check**

Run: `cd portfolio-react && npx tsc -b`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/Nav.tsx
git commit -m "feat: add sticky Nav"
```

---

## Task 13: Hero (pretext kinetic + FlexText)

**Files:**
- Create: `portfolio-react/src/components/Hero.tsx`

- [ ] **Step 1: Write Hero.tsx**

pretext is loaded via the package; if its named API differs at runtime, the hero still renders text (pretext enhances, not required). The headline uses FlexText so its weight animates on scroll.

```tsx
import { useEffect, useRef } from 'react';
import FlexText from './FlexText';

export default function Hero() {
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !subRef.current) return;
    // Progressive enhancement: apply pretext kinetic type if available.
    import('@chenglou/pretext')
      .then((mod) => {
        if (cancelled || !subRef.current) return;
        const run = (mod as any).default ?? (mod as any).pretext;
        if (typeof run === 'function') run(subRef.current);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header
      className="container"
      style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}
    >
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        // founding designer &amp; full-stack builder
      </span>
      <FlexText
        as="h1"
        style={{
          fontSize: 'clamp(2.5rem, 9vw, 7rem)',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          maxWidth: '14ch',
        }}
      >
        I love building while I design.
      </FlexText>
      <div ref={subRef} style={{ color: 'var(--muted)', maxWidth: '46ch', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
        Product design and design engineering — shipped, not theorized.
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/Hero.tsx
git commit -m "feat: add Hero with FlexText headline and pretext enhancement"
```

---

## Task 14: CreativeBanner (Studio-Rotate horizontal marquee)

**Files:**
- Create: `portfolio-react/src/components/CreativeBanner.tsx`

- [ ] **Step 1: Write CreativeBanner.tsx**

Continuous CSS marquee (duplicated track for seamless loop), pauses on hover, scrollable/swipeable on touch. Reduced-motion: becomes a static horizontally-scrollable strip.

```tsx
import { creative } from '../content/creative';

export default function CreativeBanner() {
  const items = [...creative, ...creative];
  return (
    <section aria-label="Creative work" style={{ overflow: 'hidden', paddingBlock: 'clamp(2rem, 6vw, 5rem)' }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; gap: var(--gap); width: max-content; animation: marquee 40s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-wrap { overflow-x: auto; }
          .marquee-track { animation: none; }
        }
      `}</style>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {items.map((c, i) => (
            <figure key={i} style={{ width: 'clamp(220px, 30vw, 420px)', flex: '0 0 auto' }}>
              <img
                src={c.src}
                alt={c.caption}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', background: '#161616' }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/CreativeBanner.tsx
git commit -m "feat: add CreativeBanner horizontal marquee"
```

---

## Task 15: About (expandable [+] toggle)

**Files:**
- Create: `portfolio-react/src/components/About.tsx`

- [ ] **Step 1: Write About.tsx**

```tsx
import { useState } from 'react';

export default function About() {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
          fontSize: 'clamp(1.25rem, 4vw, 2.25rem)', fontWeight: 600, display: 'flex', gap: '0.75rem', alignItems: 'baseline',
        }}
      >
        <span style={{ color: 'var(--muted)' }}>[{open ? '–' : '+'}]</span>
        A bit more about me
      </button>
      {open && (
        <p style={{ marginTop: '1.5rem', maxWidth: '60ch', color: 'var(--muted)', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
          I’m a founding designer and full-stack builder. I design products and build the things I design —
          shipping every week, learning in public, and treating AI as a collaborator rather than a shortcut.
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/About.tsx
git commit -m "feat: add expandable About section"
```

---

## Task 16: WorkList (typographic linked list)

**Files:**
- Create: `portfolio-react/src/components/WorkList.tsx`

- [ ] **Step 1: Write WorkList.tsx**

```tsx
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import FlexText from './FlexText';
import Reveal from './Reveal';

export default function WorkList() {
  return (
    <section id="work" className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        // selected work
      </span>
      <ul style={{ listStyle: 'none', marginTop: '1.5rem' }}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Reveal>
              <Link
                to={`/work/${p.slug}`}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem',
                  padding: 'clamp(1rem, 3vw, 2rem) 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap',
                }}
              >
                <FlexText as="span" style={{ fontSize: 'clamp(1.75rem, 6vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {p.title}
                </FlexText>
                <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {p.disciplines.join(' / ')} · {p.year}
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/WorkList.tsx
git commit -m "feat: add WorkList typographic linked list"
```

---

## Task 17: ExperimentsList

**Files:**
- Create: `portfolio-react/src/components/ExperimentsList.tsx`

- [ ] **Step 1: Write ExperimentsList.tsx**

```tsx
import { experiments } from '../content/experiments';
import Reveal from './Reveal';

export default function ExperimentsList() {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        // design engineering experiments
      </span>
      <div style={{ marginTop: '1.5rem', display: 'grid', gap: 'var(--gap)' }}>
        {experiments.map((e) => (
          <Reveal key={e.title}>
            <article style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.5rem' }}>
              <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 600 }}>{e.title}</h3>
              <p style={{ color: 'var(--muted)', maxWidth: '56ch', marginTop: '0.5rem' }}>{e.description}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                {e.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontSize: '0.85rem' }}>
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/ExperimentsList.tsx
git commit -m "feat: add ExperimentsList section"
```

---

## Task 18: WhatShapedMe

**Files:**
- Create: `portfolio-react/src/components/WhatShapedMe.tsx`

- [ ] **Step 1: Write WhatShapedMe.tsx**

```tsx
import { shaped } from '../content/shaped';
import Reveal from './Reveal';

export default function WhatShapedMe() {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '2rem' }}>What shaped me?</h2>
      <div style={{ display: 'grid', gap: 'clamp(2rem, 5vw, 4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))' }}>
        {shaped.map((group) => (
          <Reveal key={group.key}>
            <div>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>{group.key}</span>
              <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{item.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/WhatShapedMe.tsx
git commit -m "feat: add WhatShapedMe section"
```

---

## Task 19: Footer (contact, socials, AI sources credits)

**Files:**
- Create: `portfolio-react/src/components/Footer.tsx`

- [ ] **Step 1: Write Footer.tsx**

```tsx
import { socials } from '../content/socials';
import { sources } from '../content/sources';

export default function Footer() {
  return (
    <footer className="container" style={{ paddingBlock: 'clamp(3rem, 8vw, 6rem)', borderTop: '1px solid var(--line)' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: 700 }}>Let’s talk.</h2>
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        {socials.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontSize: '1.1rem' }}>
            {s.label} ↗
          </a>
        ))}
      </div>

      <div style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          // creative AI solutions used to design this site
        </span>
        <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))' }}>
          {sources.map((src) => (
            <li key={src.name} style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              <a href={src.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline' }}>
                {src.name}
              </a>{' '}
              — {src.note}
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: '3rem', color: 'var(--muted)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Tom Parandyk</p>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add portfolio-react/src/components/Footer.tsx
git commit -m "feat: add Footer with socials and AI sources credits"
```

---

## Task 20: Home page assembly

**Files:**
- Modify: `portfolio-react/src/pages/Home.tsx`

- [ ] **Step 1: Replace Home.tsx with full assembly**

```tsx
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import CreativeBanner from '../components/CreativeBanner';
import About from '../components/About';
import WorkList from '../components/WorkList';
import ExperimentsList from '../components/ExperimentsList';
import WhatShapedMe from '../components/WhatShapedMe';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CreativeBanner />
        <About />
        <WorkList />
        <ExperimentsList />
        <WhatShapedMe />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Manual verification — run dev server**

Run: `cd portfolio-react && npm run dev`
Open the printed localhost URL. Confirm: hero renders with large RobotoFlex headline; banner scrolls horizontally; About `[+]` expands/collapses; work list shows 6 projects; experiments + what-shaped-me + footer render; scrolling feels smooth (Lenis active). Headline/work-title weight thickens as you scroll. Stop the server when done.

- [ ] **Step 4: Commit**

```bash
git add portfolio-react/src/pages/Home.tsx
git commit -m "feat: assemble Home page"
```

---

## Task 21: Case study section components

**Files:**
- Create: `portfolio-react/src/components/case/CaseHero.tsx`
- Create: `portfolio-react/src/components/case/VideoIntro.tsx`
- Create: `portfolio-react/src/components/case/Overview.tsx`
- Create: `portfolio-react/src/components/case/MetricsGrid.tsx`
- Create: `portfolio-react/src/components/case/RoleBlock.tsx`
- Create: `portfolio-react/src/components/case/Challenges.tsx`

- [ ] **Step 1: Write CaseHero.tsx**

```tsx
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import FlexText from '../FlexText';

export default function CaseHero({ project }: { project: Project }) {
  return (
    <header className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)' }}>
      <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'underline', fontSize: '0.85rem' }}>← back</Link>
      <div style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2rem' }}>
        PROJECT [{project.projectNumber}] · {project.year}
      </div>
      <FlexText as="h1" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', lineHeight: 1.02, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
        {project.title}
      </FlexText>
      <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginTop: '0.5rem' }}>{project.subtitle}</p>
    </header>
  );
}
```

- [ ] **Step 2: Write VideoIntro.tsx**

Placeholder slot: renders a `<video>` if the file exists at runtime, else a styled placeholder box.

```tsx
import type { Project } from '../../types';

export default function VideoIntro({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(1rem, 4vw, 3rem)' }}>
      <div style={{ aspectRatio: '16 / 9', background: '#161616', display: 'grid', placeItems: 'center', border: '1px solid var(--line)' }}>
        <video
          src={project.videoSrc}
          muted
          loop
          playsInline
          controls
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.currentTarget.style.display = 'none'); }}
        />
        <span style={{ position: 'absolute', color: 'var(--muted)', fontSize: '0.85rem', pointerEvents: 'none' }}>
          ▶ video intro — coming soon
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write Overview.tsx**

```tsx
import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function Overview({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <div style={{ display: 'grid', gap: 'var(--gap)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))' }}>
          <div><span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</span><div>{project.overview.date}</div></div>
          <div><span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Categories</span><div>{project.overview.categories.join(', ')}</div></div>
          <div style={{ gridColumn: '1 / -1' }}><span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>About</span><p style={{ maxWidth: '60ch', marginTop: '0.5rem' }}>{project.about}</p></div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Write MetricsGrid.tsx**

```tsx
import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function MetricsGrid({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>// success metrics</span>
      <div style={{ display: 'grid', gap: 'var(--gap)', marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))' }}>
        {project.metrics.map((m, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.value}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{m.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Write RoleBlock.tsx**

```tsx
import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function RoleBlock({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>// my role</span>
        <p style={{ maxWidth: '60ch', marginTop: '1rem', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>{project.role}</p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 6: Write Challenges.tsx**

```tsx
import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function Challenges({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>// challenges</span>
      <div style={{ marginTop: '1.5rem', display: 'grid', gap: 'var(--gap)' }}>
        {project.challenges.map((c, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ maxWidth: '60ch' }}>
              <h3 style={{ fontWeight: 600, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>{c.heading}</h3>
              <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 8: Commit**

```bash
git add portfolio-react/src/components/case
git commit -m "feat: add case study section components"
```

---

## Task 22: CaseStudy page assembly + 404 on bad slug

**Files:**
- Modify: `portfolio-react/src/pages/CaseStudy.tsx`

- [ ] **Step 1: Replace CaseStudy.tsx**

```tsx
import { useParams } from 'react-router-dom';
import { getProject } from '../content/lookup';
import NotFound from './NotFound';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CaseHero from '../components/case/CaseHero';
import VideoIntro from '../components/case/VideoIntro';
import Overview from '../components/case/Overview';
import MetricsGrid from '../components/case/MetricsGrid';
import RoleBlock from '../components/case/RoleBlock';
import Challenges from '../components/case/Challenges';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug ?? '');
  if (!project) return <NotFound />;

  return (
    <>
      <Nav />
      <main>
        <CaseHero project={project} />
        <VideoIntro project={project} />
        <Overview project={project} />
        <MetricsGrid project={project} />
        <RoleBlock project={project} />
        <Challenges project={project} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Manual verification — routing**

Run: `cd portfolio-react && npm run dev`
- Click a project on the home page → navigates to `/work/<slug>`, shows case sections in order, scrolls to top.
- Visit `/work/adlook` directly → renders.
- Visit `/work/nonsense` directly → shows the 404.
Stop the server when done.

- [ ] **Step 4: Commit**

```bash
git add portfolio-react/src/pages/CaseStudy.tsx
git commit -m "feat: assemble CaseStudy page with 404 on unknown slug"
```

---

## Task 23: Remotion composition root (placeholder, renderable)

**Files:**
- Create: `portfolio-react/src/remotion/Root.tsx`
- Modify: `portfolio-react/package.json` (add remotion deps + a remotion script)

- [ ] **Step 1: Add Remotion dependencies**

Run: `cd portfolio-react && npm install remotion @remotion/cli`
Expected: installs without blocking errors.

- [ ] **Step 2: Add a remotion preview script to package.json**

Add to the `scripts` block (keep existing scripts):

```json
"remotion": "remotion studio src/remotion/Root.tsx"
```

- [ ] **Step 3: Write src/remotion/Root.tsx**

A minimal renderable composition that animates a project title — the seed for real intro videos later.

```tsx
import { Composition, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

const IntroComp: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const wght = Math.round(interpolate(frame, [0, 60], [300, 900], { extrapolateRight: 'clamp' }));
  return (
    <AbsoluteFill style={{ background: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
      <span style={{ color: '#f4f4f2', fontSize: 120, fontFamily: 'Roboto Flex, sans-serif', opacity, fontVariationSettings: `"wght" ${wght}` }}>
        {title}
      </span>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ProjectIntro"
    component={IntroComp}
    durationInFrames={90}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ title: 'Adlook' }}
  />
);
```

- [ ] **Step 4: Verify main build is unaffected**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0 (Remotion root is not imported by the app bundle, so it must not affect the site build).

- [ ] **Step 5: Commit**

```bash
git add portfolio-react/package.json portfolio-react/package-lock.json portfolio-react/src/remotion/Root.tsx
git commit -m "feat: add Remotion composition root (placeholder intro)"
```

---

## Task 24: Final verification, README, deploy config check

**Files:**
- Create: `portfolio-react/README.md`

- [ ] **Step 1: Run the full test suite**

Run: `cd portfolio-react && npm test`
Expected: all Vitest tests pass (projects, lookup, flexAnim).

- [ ] **Step 2: Run type-check + production build**

Run: `cd portfolio-react && npm run build`
Expected: exit code 0, `dist/` produced.

- [ ] **Step 3: Preview the production build locally**

Run: `cd portfolio-react && npm run preview`
Open the printed URL. Confirm home + a case study + a deep-linked `/work/adlook` all render. Stop the server.

- [ ] **Step 4: Write README.md**

```markdown
# portfolio-react

Single-page portfolio (React + Vite) deployed to Vercel. Organized like marinkurir.com: a typographic work list linking to dedicated case-study routes, a horizontal creative banner, RobotoFlex weight-on-scroll, pretext kinetic type, and Lenis + GSAP smooth scroll. Remotion is wired up for creative intro videos (placeholders for now).

## Develop

\`\`\`bash
npm install
npm run dev
\`\`\`

## Test / build

\`\`\`bash
npm test
npm run build
npm run preview
\`\`\`

## Remotion studio

\`\`\`bash
npm run remotion
\`\`\`

## Edit content

All content is data in \`src/content/\`:
- \`projects.ts\` — the 6 case studies (add/edit projects here)
- \`experiments.ts\`, \`creative.ts\`, \`shaped.ts\`, \`socials.ts\`, \`sources.ts\`

Drop project media into \`public/media/\` matching the \`thumb\` / \`videoSrc\` / \`creative\` paths.

## Deploy (Vercel)

Set the Vercel project root to \`portfolio-react/\`. \`vercel.json\` rewrites all routes to \`index.html\` so client-side routes work on refresh. Build command \`npm run build\`, output \`dist\`.
\`\`\`

- [ ] **Step 5: Commit**

```bash
git add portfolio-react/README.md
git commit -m "docs: add portfolio-react README"
```

---

## Self-Review Notes

- **Spec coverage:** new folder (T1) ✓; fresh content (T4–T5) ✓; Marin organization homepage + case routes (T20, T22) ✓; Studio-Rotate banner (T14) ✓; RobotoFlex weight-on-scroll (T2, T8, T10) ✓; pretext (T13) ✓; Lenis+GSAP (T7) ✓; Remotion placeholder (T23) ✓; mobile-portable single-column/clamp/reflow (T2 + per-component responsive styles) ✓; expandable About (T15) ✓; experiments homepage-only (T17) ✓; 6 slugs newest→oldest (T4) ✓; What Shaped Me + Audiobooks (T5) ✓; footer socials + AI sources credits (T5, T19) ✓; reduced-motion (T2, T10, T11, T14) ✓; Vercel SPA rewrite (T1) ✓; tests for data/routing/mapping (T4, T6, T8) ✓.
- **Type consistency:** `getProject` defined T6, used T22; `Project` type T4 used throughout; `weightForProgress`/`FLEX_MIN`/`FLEX_MAX` T8 used T10; `REVEAL` T8 used T11; content arrays named consistently (`projects`, `experiments`, `creative`, `shaped`, `socials`, `sources`).
- **Placeholders:** media files under `/public/media/` are intentionally absent (videos/images come later); components degrade gracefully (lazy img on missing src shows empty box; video `onError` hides element revealing the "coming soon" label). This is deliberate, not a plan gap.
