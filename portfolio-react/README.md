# portfolio-react

Single-page portfolio (React + Vite) deployed to Vercel. Organized like marinkurir.com: a typographic work list linking to dedicated case-study routes, a horizontal creative banner, RobotoFlex weight-on-scroll, pretext kinetic type, and Lenis + GSAP smooth scroll. Remotion is wired up for creative intro videos (placeholders for now).

This app is separate from the older `index.html` static site at the repo root and does not touch it.

## Develop

```bash
npm install
npm run dev
```

## Test / build

```bash
npm test
npm run build
npm run preview
```

## Remotion studio

```bash
npm run remotion
```

## Edit content

All content is data in `src/content/`:

- `projects.ts` — the 6 case studies (add/edit projects here)
- `experiments.ts` — design-engineering experiments (homepage-only)
- `creative.ts` — horizontal banner images
- `shaped.ts` — "What shaped me" groups
- `socials.ts` — Medium, LinkedIn, Dribbble
- `sources.ts` — AI skills/tools credited in the footer

Drop project media into `public/media/` matching the `thumb` / `videoSrc` / `creative` paths. Until then, the banner shows empty image boxes and case-study videos show a "coming soon" placeholder.

## Architecture

- `src/lib/smoothScroll.tsx` — Lenis + GSAP ScrollTrigger, initialized once app-wide
- `src/lib/flexAnim.ts` — shared weight-on-scroll mapping and motion config (single source of truth for consistent motion)
- `src/components/FlexText.tsx` — animates RobotoFlex `wght` axis as text scrolls
- `src/components/Reveal.tsx` — on-scroll reveal wrapper
- `src/pages/CaseStudy.tsx` — one generic template driven by the route slug
- All animations respect `prefers-reduced-motion`.

## Deploy (Vercel)

Set the Vercel project root to `portfolio-react/`. `vercel.json` rewrites all routes to `index.html` so client-side routes work on refresh. Build command `npm run build`, output directory `dist`.
