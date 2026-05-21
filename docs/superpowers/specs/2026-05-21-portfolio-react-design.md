# Portfolio React App — Design Spec

**Date:** 2026-05-21
**Author:** Tom Parandyk (with Claude Code)
**Status:** Approved, ready for implementation plan

## 1. Summary

A brand-new single-page portfolio, built as a React app and deployed to Vercel. It is **separate from the existing `index.html` static site** and lives in its own folder. All content is **fresh** — nothing is copied from `index.html`. The site is organized exactly like [marinkurir.com](https://www.marinkurir.com/): a homepage with a typographic work list that links to dedicated case-study pages, plus a Studio-Rotate-style horizontal image banner woven into the homepage.

The site features product-design case studies for six recent projects, a design-engineering experiments section, a "What Shaped Me" section, and a footer that credits every creative-AI solution (Claude Code skills + tools) used to design the site.

## 2. Goals & Constraints

- **Single-page homepage** + dedicated case-study routes (Marin Kurir organization).
- **Mobile-portable without redesign**: single-column-first, fluid type via `clamp()`, layout reflows rather than rearranges. No separate mobile design pass.
- **Smooth, consistent motion** across the whole site, driven by one shared animation config.
- **RobotoFlex variable font** as the single typeface; its weight axis animates as text scrolls.
- **pretext** for kinetic typography animations.
- **Remotion** wired up for creative animations (videos are placeholders for now).
- **Lenis + GSAP ScrollTrigger** for smooth scroll + scroll choreography.
- Content is **data-driven** so projects/sections are edited as data, never JSX.
- `prefers-reduced-motion` respected throughout.

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Build | Vite + React + TypeScript |
| Routing | React Router |
| Smooth scroll | Lenis |
| Scroll choreography + variable-font animation | GSAP + ScrollTrigger |
| Kinetic typography | pretext (`@chenglou/pretext`) |
| Creative video animations | Remotion (placeholder videos for now) |
| Font | RobotoFlex variable, self-hosted |
| Hosting | Vercel (SPA rewrite via `vercel.json`) |

## 4. Folder Layout

New app folder at repo root, alongside (not touching) the existing static site:

```
portfolio-react/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vercel.json                 # SPA rewrite so /work/:slug refreshes work
├── public/
│   └── fonts/RobotoFlex.woff2  # self-hosted variable font
└── src/
    ├── main.tsx
    ├── App.tsx                 # Router: / → Home, /work/:slug → CaseStudy
    ├── pages/
    │   ├── Home.tsx
    │   ├── CaseStudy.tsx       # generic template driven by slug
    │   └── NotFound.tsx
    ├── components/
    │   ├── Nav.tsx
    │   ├── Hero.tsx
    │   ├── CreativeBanner.tsx  # Studio-Rotate horizontal marquee
    │   ├── About.tsx           # expandable [+] toggle
    │   ├── WorkList.tsx        # typographic linked list
    │   ├── ExperimentsList.tsx
    │   ├── WhatShapedMe.tsx
    │   ├── Footer.tsx          # contact, socials, AI-sources credits
    │   ├── FlexText.tsx        # RobotoFlex weight-on-scroll wrapper
    │   ├── Reveal.tsx          # generic on-scroll reveal
    │   └── case/
    │       ├── CaseHero.tsx
    │       ├── VideoIntro.tsx  # placeholder video slot
    │       ├── Overview.tsx
    │       ├── MetricsGrid.tsx
    │       ├── RoleBlock.tsx
    │       └── Challenges.tsx
    ├── content/
    │   ├── projects.ts
    │   ├── experiments.ts
    │   ├── creative.ts         # banner image list
    │   ├── shaped.ts
    │   ├── socials.ts
    │   └── sources.ts          # AI skills/tools + links for footer credits
    ├── lib/
    │   ├── smoothScroll.ts     # Lenis init + GSAP ScrollTrigger sync (app-wide)
    │   └── flexAnim.ts         # shared RobotoFlex weight-on-scroll mapping + easing
    └── remotion/
        └── Root.tsx            # Remotion composition root (renderable, placeholder)
```

## 5. Routes & Page Structure

### `/` — Homepage (single scroll, top → bottom)

1. **Nav** — name + ABOUT · WORK
2. **Hero** — pretext kinetic looping type + RobotoFlex weight-on-scroll
3. **Horizontal creative banner** — Studio-Rotate-style auto-scroll marquee of creative work images; continuous loop, pause/drag on hover, touch-swipe on mobile
4. **About** — expandable `[+]` bio block (collapsed by default)
5. **Selected Work** — typographic list; each row = thumbnail + title + disciplines + year, links to its case-study route
6. **Design Engineering Experiments** — homepage-only list with descriptions + external links (npm/github). No detail pages.
7. **What Shaped Me** — three groups: `creative_practice`, `athletic_disciplines`, `foundation` (Audiobooks added to foundation)
8. **Footer** — contact + Medium · LinkedIn · Dribbble + "creative AI solutions used to design this site" credits list

### `/work/:slug` — Case study page (Marin section order)

1. Back link + `PROJECT [NN]` + year + title
2. Video intro (placeholder slot)
3. Overview — date · categories · subtitle
4. About the project
5. Success metrics
6. My role
7. Challenges
8. Footer (contact + socials)

**6 case-study routes** (newest → oldest):
`adlook`, `tessl`, `koyeb`, `qodo`, `neon`, `bnp-paribas`.

| Slug | Title | Subtitle |
|---|---|---|
| adlook | Adlook | Internal Deal Platform |
| tessl | Tessl | Skills Registry |
| koyeb | Koyeb | Deployment Platform |
| qodo | Qodo | AI Code Generation |
| neon | Neon | Serverless Database |
| bnp-paribas | BNP Paribas | Internal Deal Platform |

## 6. Content Model

`projects.ts` — array of:
```ts
type Project = {
  slug: string;
  projectNumber: string;      // "01".."06"
  title: string;
  subtitle: string;
  year: string;
  disciplines: string[];
  thumb: string;              // homepage list thumbnail
  videoSrc: string;           // placeholder for now
  overview: { date: string; categories: string[]; subtitle: string };
  about: string;
  metrics: { value: string; label: string }[];
  role: string;
  challenges: { heading: string; body: string }[];
};
```

`experiments.ts` — `{ title, description, links: {label, href}[] }`:
- **Stackpack Debug**
- **Claude Skills** — set of 10+ custom skills
- **BYOA + Kinetic Type**

`creative.ts` — banner image list (Tom's creative design work).

`shaped.ts` — three groups:
- `// creative_practice`: Photography (light, composition, patience); Cinematography (motion, frame, story); Music Composition (structure beneath feeling); Design History (form follows function follows culture)
- `// athletic_disciplines`: Fencing (epee) — chess at blade speed; Ice Hockey — controlled chaos on ice; Table Tennis — reaction over strategy; Strength Training — the discipline compounds; Swimming — the best kind of silence; Badminton — new · terrible · obsessed
- `// foundation`: Father of Three — the reason I build things that last; Meditation — not a hobby, infrastructure; Beginner's Mind — protected at all costs; **Audiobooks** (added)

`socials.ts`:
- Medium — https://medium.com/@tomparandyk
- LinkedIn — https://www.linkedin.com/in/tmass/
- Dribbble — https://dribbble.com/tmass

`sources.ts` — AI skills/tools used to design & build the site, each with a link. Rendered in footer. See §8.

## 7. Visual Style & Motion

**Visual:** Marin-Kurir minimalism — near-black/white, generous whitespace, RobotoFlex carrying all hierarchy through weight + size (no second typeface). The horizontal banner is the one bold moment.

**Motion system** (single shared config in `lib/flexAnim.ts` + `lib/smoothScroll.ts` so it's smooth and consistent):
- Lenis smooth scroll app-wide, synced to GSAP ScrollTrigger.
- RobotoFlex `wght` (optionally `wdth`/`slnt`) axes animate as headings enter/scroll, via `FlexText`.
- pretext kinetic type in hero + section headings.
- Subtle on-scroll reveals via `Reveal` — short, staggered, low-travel.
- Horizontal banner: continuous marquee; pause/drag on hover; touch-swipe on mobile.
- `prefers-reduced-motion`: all animations degrade to instant/static.

## 8. Footer Sources Section (AI credits)

Driven by `sources.ts`, rendered as a hyperlinked credits list. Lists every Claude Code skill and AI tool used to design/build the site.

**Design & build skills**
- `frontend-design` — https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design
- `impeccable` — Claude Code design skill
- `refactoring-ui` — https://github.com/wondelai/skills (Refactoring UI, Wathan & Schoger)
- `web-typography` — https://github.com/wondelai/skills
- `ux-heuristics` — https://github.com/wondelai/skills (Nielsen's 10 heuristics)
- `visual-hierarchy-refactoring` — Claude Code design skill
- `design-taste-frontend` — Claude Code design skill
- `awesome-design` — design-systems reference skill
- `emilkowal-animations` — https://emilkowal.ski/
- `remotion-best-practices` — https://www.remotion.dev/
- `video-to-website` — scroll-driven site skill
- `ui-skills` — interface-constraints skill
- `foresight` — Tom's own skill (`npx add-skills foresight`), https://github.com/tombrewsviews

**AI tools / infrastructure**
- Claude Code (Anthropic) — the build agent — https://claude.com/claude-code
- Superpowers brainstorming + visual companion — design process

## 9. Claude Code Skills Used (research deliverable)

Skills curated for designing a better portfolio. Most are bundled/available in-session (invoke directly, no install). Two were installed from [wondelai/skills](https://github.com/wondelai/skills).

| Skill | Install / availability | Purpose |
|---|---|---|
| frontend-design | bundled | distinctive production-grade UI |
| impeccable | bundled | hierarchy, motion, polish |
| refactoring-ui | bundled | spacing, color, depth |
| web-typography | `npx skills add wondelai/skills/web-typography` ✅ installed | variable fonts, type scale, font loading |
| ux-heuristics | `npx skills add wondelai/skills/ux-heuristics` ✅ installed | usability audit (Nielsen) |
| visual-hierarchy-refactoring | bundled | size/weight/contrast/whitespace |
| design-taste-frontend | bundled | metric-based rules, CSS hardware accel |
| awesome-design | bundled | proven design languages |
| emilkowal-animations | bundled | tasteful easing/transitions |
| remotion-best-practices | bundled | Remotion patterns |
| video-to-website | bundled | scroll-driven animated site patterns |
| ui-skills | bundled | interface constraints |
| foresight | `npx add-skills foresight` (Tom's own) | post-impl lookahead |

## 10. Testing & Deploy

Lightweight (portfolio scope):
- `tsc` type-check + `vite build` must pass.
- Content data validated: every project has required fields; slugs unique.
- Routing smoke test: each `/work/:slug` resolves; unknown slug → NotFound.
- Manual visual check on running dev server before deploy.
- Deploy to Vercel with `vercel.json` SPA rewrite so client routes survive refresh.

## 11. Out of Scope (YAGNI)

- No CMS / backend.
- No real videos yet (placeholders).
- No light/dark theme toggle (single near-black/white scheme).
- No i18n.
- No detail pages for experiments (homepage-only).
- Existing `index.html` static site is untouched.
