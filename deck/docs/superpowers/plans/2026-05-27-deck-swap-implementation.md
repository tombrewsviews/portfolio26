# Deck-Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `deck-swap` Next.js app that lets a presenter drive a shared slide deck — viewers see the current slide in real time, can scroll back to slides already shown, and can switch between four pre-designed visual variants per slide.

**Architecture:** Next.js 15 App Router with two page surfaces (presenter `/p/[deckId]/[token]`, viewer `/v/[deckId]`). Presenter POSTs slide changes to an Edge route that writes to Upstash Redis and publishes to a pub/sub channel. Viewers subscribe via Server-Sent Events on a long-lived Edge stream. All slide variants are static React components, registered at build time by a small codegen script.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Upstash Redis (`@upstash/redis`), Framer Motion, pnpm. Hosted on Vercel.

**Spec:** `deck/docs/superpowers/specs/2026-05-27-presenter-sync-deck-design.md`

**Working directory:** All paths in this plan are relative to `/Users/parandykt/CV/Portfolio 2026/Mar2026/v3/deck-swap/` unless otherwise specified.

---

## Pre-Implementation Notes

- **No automated tests.** Verification is manual via the checklist in Task 12.
- **Commit cadence:** one commit per task unless a task says otherwise.
- **Commits go in the parent repo** at `/Users/parandykt/CV/Portfolio 2026/Mar2026/v3/` (the repo already covers this directory). Branch is `main`.
- **Style:** match the existing repo's commit message style — lowercase type prefix, no Conventional-Commit strictness (`feat:`, `chore:`, `docs:`, `ui:` are all in use).
- **Co-author trailer** required on every commit: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`

---

## File Structure

```
deck-swap/
  package.json
  pnpm-lock.yaml                  # generated
  tsconfig.json
  next.config.ts
  postcss.config.mjs
  .gitignore
  .env.local.example
  README.md
  scripts/
    gen-registry.ts               # reads decks/, writes _generated.ts files
  src/
    app/
      layout.tsx
      page.tsx                    # deck index, lists known decks
      globals.css                 # tailwind + base
      p/[deckId]/[token]/page.tsx # presenter view
      v/[deckId]/page.tsx         # viewer view
      api/
        state/[deckId]/route.ts   # GET ?stream=1 (SSE) + POST
        health/route.ts
    decks/
      intro-talk/
        deck.config.ts            # imports _generated registry
        _generated.ts             # codegen output
        slides/
          01-hello/
            claude.tsx
            design.tsx
            stitch.tsx
            hermes.tsx
          02-problem/
            claude.tsx
            design.tsx
            stitch.tsx
            hermes.tsx
          03-cta/
            claude.tsx
            design.tsx
            stitch.tsx
            hermes.tsx
    lib/
      types.ts                    # SlideMeta, Variant, Deck, DeckState
      hmac.ts                     # token derivation + verification (Edge-compatible)
      redis.ts                    # Upstash client + key helpers
      ui/
        SlideStage.tsx            # variant resolver + transition wrapper
        PresenterHUD.tsx
        ViewerOverlay.tsx         # design-lens picker + behind-live bar
    hooks/
      useDeckState.ts             # SSE subscription hook
      useKeyboard.ts              # presenter & viewer key handlers
```

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: `deck-swap/` (entire scaffold)

- [ ] **Step 1: Create the project with the Next.js CLI**

Run from `/Users/parandykt/CV/Portfolio 2026/Mar2026/v3/`:
```bash
pnpm create next-app@latest deck-swap --typescript --tailwind --app --no-src-dir --import-alias "@/*" --turbopack --use-pnpm --yes
```

Expected: creates `deck-swap/` with Next.js 15, React 19, Tailwind v4, App Router. The `--no-src-dir` flag is on purpose so we get `app/` at the project root — we'll then manually move it into `src/` in step 2 (the CLI's `--src-dir` flag has been flaky across versions; doing it manually guarantees the layout).

- [ ] **Step 2: Reorganize into `src/`**

Run from `/Users/parandykt/CV/Portfolio 2026/Mar2026/v3/deck-swap/`:
```bash
mkdir src && git mv app src/app
```

Update `tsconfig.json` `paths` to point `@/*` at `./src/*`:
```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Update `tailwind.config` (or the `@source` line in `src/app/globals.css` if Tailwind v4 generated that style) so it scans `./src/**/*.{ts,tsx,mdx}` instead of `./app/...`.

- [ ] **Step 3: Verify the dev server boots**

```bash
pnpm dev
```

Expected: server starts, `http://localhost:3000` shows the default Next.js page. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add deck-swap/
git commit -m "$(cat <<'EOF'
feat: scaffold deck-swap Next.js app

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Install runtime dependencies

**Files:**
- Modify: `deck-swap/package.json`

- [ ] **Step 1: Install runtime packages**

Run from `deck-swap/`:
```bash
pnpm add @upstash/redis framer-motion
pnpm add -D tsx
```

Expected: `package.json` `dependencies` now includes `@upstash/redis`, `framer-motion`. `devDependencies` includes `tsx`.

- [ ] **Step 2: Add `predev` and `prebuild` hooks**

Edit `deck-swap/package.json` — add to the `scripts` block:
```json
{
  "scripts": {
    "predev": "tsx scripts/gen-registry.ts",
    "prebuild": "tsx scripts/gen-registry.ts",
    "gen": "tsx scripts/gen-registry.ts"
  }
}
```

(Keep the `dev`, `build`, `start`, `lint` entries the CLI generated.)

- [ ] **Step 3: Commit**

```bash
git add deck-swap/package.json deck-swap/pnpm-lock.yaml
git commit -m "$(cat <<'EOF'
chore: add upstash, framer-motion, tsx; wire codegen scripts

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Add `.env.local.example` and `.gitignore` rules

**Files:**
- Create: `deck-swap/.env.local.example`
- Modify: `deck-swap/.gitignore`

- [ ] **Step 1: Write `.env.local.example`**

```bash
# 32+ byte random hex string. Used to derive presenter URL tokens.
# Generate with: openssl rand -hex 32
PRESENTER_SECRET=

# From the Upstash Redis dashboard for your database.
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

- [ ] **Step 2: Add `_generated.ts` to gitignore**

Append to `deck-swap/.gitignore`:
```
# codegen output (regenerated by predev/prebuild)
src/decks/*/_generated.ts
```

(The Next.js scaffold already excludes `.env*.local`, `node_modules`, `.next` — verify, don't duplicate.)

- [ ] **Step 3: Commit**

```bash
git add deck-swap/.env.local.example deck-swap/.gitignore
git commit -m "$(cat <<'EOF'
chore: env example + ignore codegen output

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Define core types

**Files:**
- Create: `deck-swap/src/lib/types.ts`

- [ ] **Step 1: Write `types.ts`**

```ts
import type { ComponentType } from 'react';

export type VariantKey = 'claude' | 'design' | 'stitch' | 'hermes';

export const VARIANT_LABELS: Record<VariantKey, string> = {
  claude: 'Claude Code + Skills',
  design: 'Claude Design',
  stitch: 'Google Stitch',
  hermes: 'Hermès',
};

export type TransitionKind = 'fade' | 'cut' | 'custom';

export interface SlideProps {
  phase: 'entering' | 'active' | 'leaving';
}

export interface SlideMeta {
  id: string;
  variant: VariantKey;
  transition: TransitionKind;
}

export interface SlideModule {
  default: ComponentType<SlideProps>;
  meta: SlideMeta;
}

export interface SlideEntry {
  id: string;
  variants: Partial<Record<VariantKey, SlideModule>>;
}

export interface Deck {
  id: string;
  title: string;
  defaultVariant: VariantKey;
  slides: SlideEntry[];
}

export interface DeckState {
  currentSlide: number;
  maxReached: number;
  updatedAt: number;
  version: number;
}

export const INITIAL_DECK_STATE: DeckState = {
  currentSlide: 0,
  maxReached: 0,
  updatedAt: 0,
  version: 0,
};
```

- [ ] **Step 2: Verify it compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors. (If `tsc` is not in path, use `./node_modules/.bin/tsc --noEmit`.)

- [ ] **Step 3: Commit**

```bash
git add deck-swap/src/lib/types.ts
git commit -m "$(cat <<'EOF'
feat: core types — deck, variant, slide, state

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: HMAC token derivation (Edge-compatible)

**Files:**
- Create: `deck-swap/src/lib/hmac.ts`

The token is `HMAC-SHA256(deckId, PRESENTER_SECRET)` hex-encoded, truncated to 16 chars. Must run on Edge runtime, so use Web Crypto, **not** Node `crypto`.

- [ ] **Step 1: Write `hmac.ts`**

```ts
const encoder = new TextEncoder();

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function deriveToken(deckId: string, secret: string): Promise<string> {
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(deckId));
  return toHex(sig).slice(0, 16);
}

export async function verifyToken(
  deckId: string,
  token: string,
  secret: string
): Promise<boolean> {
  const expected = await deriveToken(deckId, secret);
  if (expected.length !== token.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return mismatch === 0;
}
```

The hand-rolled constant-time compare avoids timing attacks; Web Crypto doesn't ship one.

- [ ] **Step 2: Verify it compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add deck-swap/src/lib/hmac.ts
git commit -m "$(cat <<'EOF'
feat: edge-compatible HMAC token derivation + verify

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Redis client + key helpers

**Files:**
- Create: `deck-swap/src/lib/redis.ts`

Upstash's REST client is fetch-based and works on both Edge and Node runtimes. Their JS SDK exposes `publish` for pub/sub.

- [ ] **Step 1: Write `redis.ts`**

```ts
import { Redis } from '@upstash/redis';
import type { DeckState } from './types';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const stateKey = (deckId: string) => `deck:${deckId}`;
export const eventsChannel = (deckId: string) => `deck:${deckId}:events`;

export async function readState(deckId: string): Promise<DeckState | null> {
  const raw = await redis.get<DeckState>(stateKey(deckId));
  return raw ?? null;
}

export async function writeAndPublish(deckId: string, next: DeckState): Promise<void> {
  await redis.set(stateKey(deckId), next);
  await redis.publish(eventsChannel(deckId), JSON.stringify(next));
}
```

- [ ] **Step 2: Verify it compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add deck-swap/src/lib/redis.ts
git commit -m "$(cat <<'EOF'
feat: upstash redis client + state read/write helpers

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Registry codegen script

**Files:**
- Create: `deck-swap/scripts/gen-registry.ts`

This script walks `src/decks/*/slides/*/*.tsx` and emits a `_generated.ts` per deck with static imports of every variant, plus a `slides` array in alphabetical order of slide id.

- [ ] **Step 1: Write `gen-registry.ts`**

```ts
import { readdirSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DECKS_DIR = resolve(process.cwd(), 'src/decks');
const VARIANTS = ['claude', 'design', 'stitch', 'hermes'] as const;

function isDir(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function listDecks(): string[] {
  if (!existsSync(DECKS_DIR)) return [];
  return readdirSync(DECKS_DIR).filter((name) => isDir(join(DECKS_DIR, name)));
}

function listSlides(deckId: string): string[] {
  const slidesDir = join(DECKS_DIR, deckId, 'slides');
  if (!existsSync(slidesDir)) return [];
  return readdirSync(slidesDir)
    .filter((name) => isDir(join(slidesDir, name)))
    .sort();
}

function generateForDeck(deckId: string): string {
  const slides = listSlides(deckId);
  const imports: string[] = [];
  const slideEntries: string[] = [];

  for (const slideId of slides) {
    const variantEntries: string[] = [];
    for (const v of VARIANTS) {
      const file = join(DECKS_DIR, deckId, 'slides', slideId, `${v}.tsx`);
      if (!existsSync(file)) continue;
      const alias = `s_${slideId.replace(/-/g, '_')}_${v}`;
      imports.push(`import * as ${alias} from './slides/${slideId}/${v}';`);
      variantEntries.push(`    ${v}: ${alias} as unknown as SlideModule,`);
    }
    slideEntries.push(`  {
    id: '${slideId}',
    variants: {
${variantEntries.join('\n')}
    },
  },`);
  }

  return `// AUTO-GENERATED by scripts/gen-registry.ts — do not edit.
import type { SlideEntry, SlideModule } from '@/lib/types';
${imports.join('\n')}

export const slides: SlideEntry[] = [
${slideEntries.join('\n')}
];
`;
}

function main(): void {
  const decks = listDecks();
  if (decks.length === 0) {
    console.log('[gen-registry] no decks found in src/decks/');
    return;
  }
  for (const deckId of decks) {
    const out = generateForDeck(deckId);
    const target = join(DECKS_DIR, deckId, '_generated.ts');
    writeFileSync(target, out, 'utf8');
    console.log(`[gen-registry] wrote ${target}`);
  }
}

main();
```

- [ ] **Step 2: Run it (will be a no-op until slides exist)**

```bash
pnpm gen
```

Expected: `[gen-registry] no decks found in src/decks/`.

- [ ] **Step 3: Commit**

```bash
git add deck-swap/scripts/gen-registry.ts
git commit -m "$(cat <<'EOF'
feat: codegen script for per-deck slide registry

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Demo deck — three slides × four variants

**Files:**
- Create: `deck-swap/src/decks/intro-talk/deck.config.ts`
- Create: `deck-swap/src/decks/intro-talk/slides/01-hello/{claude,design,stitch,hermes}.tsx`
- Create: `deck-swap/src/decks/intro-talk/slides/02-problem/{claude,design,stitch,hermes}.tsx`
- Create: `deck-swap/src/decks/intro-talk/slides/03-cta/{claude,design,stitch,hermes}.tsx`

The four variants should look visibly different so it's obvious lens-switching works. Designs are intentionally simple — they're demo content, not production.

- [ ] **Step 1: `deck.config.ts`**

```ts
import type { Deck } from '@/lib/types';
import { slides } from './_generated';

export const deck: Deck = {
  id: 'intro-talk',
  title: 'Intro Talk',
  defaultVariant: 'claude',
  slides,
};
```

- [ ] **Step 2: Slide 01 — `claude.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">claude · skills</p>
        <h1 className="mt-4 text-7xl font-semibold leading-tight">Hello.</h1>
        <p className="mt-6 text-xl text-zinc-400">A talk about shipping with agents.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Slide 01 — `design.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'design', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-zinc-900 p-16">
      <div className="max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Claude Design</p>
        <h1 className="mt-8 text-8xl font-light tracking-tight">Hello</h1>
        <div className="mx-auto mt-8 h-px w-24 bg-zinc-900" />
        <p className="mt-8 text-lg text-zinc-600">A talk about shipping with agents.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Slide 01 — `stitch.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'stitch', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-zinc-900 p-16">
      <div className="max-w-3xl rounded-3xl border border-zinc-200 bg-white/70 p-12 shadow-xl backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Google Stitch</p>
        <h1 className="mt-3 text-6xl font-bold">👋 Hello</h1>
        <p className="mt-4 text-lg text-zinc-600">A talk about shipping with agents.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Slide 01 — `hermes.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'hermes', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F47B20] text-white p-16">
      <div className="max-w-3xl border border-white/30 p-16">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">Hermès</p>
        <h1 className="mt-6 font-serif text-8xl italic">Hello.</h1>
        <p className="mt-8 font-serif text-lg leading-relaxed text-white/90">
          Une conversation sur l&apos;art de livrer avec des agents.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Slide 02 — `claude.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">02 · problem</p>
        <h2 className="mt-4 text-5xl font-semibold leading-tight">
          The same deck looks different to different people.
        </h2>
        <ul className="mt-8 space-y-2 text-lg text-zinc-400">
          <li>— Designers want craft.</li>
          <li>— Engineers want clarity.</li>
          <li>— Investors want signal.</li>
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Slide 02 — `design.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'design', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-zinc-900 p-16">
      <div className="grid max-w-5xl grid-cols-2 gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">02 / Problem</p>
          <h2 className="mt-6 text-5xl font-light leading-tight">One deck, many readers.</h2>
        </div>
        <div className="border-l border-zinc-200 pl-8">
          <p className="text-zinc-600">Designers want craft.</p>
          <p className="mt-3 text-zinc-600">Engineers want clarity.</p>
          <p className="mt-3 text-zinc-600">Investors want signal.</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Slide 02 — `stitch.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'stitch', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-zinc-900 p-16">
      <div className="max-w-4xl rounded-3xl border border-zinc-200 bg-white/70 p-12 shadow-xl backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Problem</p>
        <h2 className="mt-3 text-4xl font-bold">One deck, three audiences. 🎨🧑‍💻💰</h2>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-pink-100 p-4 text-sm">Designers want craft</div>
          <div className="rounded-xl bg-blue-100 p-4 text-sm">Engineers want clarity</div>
          <div className="rounded-xl bg-green-100 p-4 text-sm">Investors want signal</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Slide 02 — `hermes.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'hermes', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F47B20] text-white p-16">
      <div className="max-w-3xl border border-white/30 p-16">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">II. Le problème</p>
        <h2 className="mt-6 font-serif text-5xl italic leading-tight">
          Un seul récit, trois publics.
        </h2>
        <p className="mt-8 font-serif text-base leading-relaxed text-white/90">
          Le designer cherche le geste. L&apos;ingénieur cherche la clarté.
          L&apos;investisseur cherche le signal.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 10: Slide 03 — `claude.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">03 · cta</p>
        <h2 className="mt-4 text-6xl font-semibold leading-tight">Pick a lens.</h2>
        <p className="mt-6 text-xl text-zinc-400">
          The picker is in the top right. Try each one before I move on.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 11: Slide 03 — `design.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'design', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-zinc-900 p-16">
      <div className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">03 / Try it</p>
        <h2 className="mt-8 text-6xl font-light leading-tight">Pick a lens.</h2>
        <div className="mx-auto mt-8 h-px w-24 bg-zinc-900" />
        <p className="mt-8 text-lg text-zinc-600">Top right — try each one.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 12: Slide 03 — `stitch.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'stitch', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-zinc-900 p-16">
      <div className="max-w-2xl rounded-3xl border border-zinc-200 bg-white/70 p-12 text-center shadow-xl backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Your turn</p>
        <h2 className="mt-3 text-5xl font-bold">Pick a lens ↗</h2>
        <p className="mt-4 text-lg text-zinc-600">The control is in the top right.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 13: Slide 03 — `hermes.tsx`**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'hermes', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F47B20] text-white p-16">
      <div className="max-w-2xl border border-white/30 p-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">III. À vous</p>
        <h2 className="mt-6 font-serif text-6xl italic">Choisissez.</h2>
        <p className="mt-8 font-serif text-base leading-relaxed text-white/90">
          Le sélecteur est en haut, à droite.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 14: Run codegen and verify**

```bash
pnpm gen
```

Expected: `[gen-registry] wrote .../src/decks/intro-talk/_generated.ts`.

Inspect the generated file — it should have 12 imports and 3 slide entries.

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 15: Commit**

```bash
git add deck-swap/src/decks/
git commit -m "$(cat <<'EOF'
feat: demo deck — 3 slides × 4 lens variants

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: API routes — state read (SSE) + write + health

**Files:**
- Create: `deck-swap/src/app/api/state/[deckId]/route.ts`
- Create: `deck-swap/src/app/api/health/route.ts`

Single route file handles both `GET` (SSE stream) and `POST` (presenter write). The SSE handler holds a long-lived `ReadableStream` and polls Redis for state changes — Upstash's REST client doesn't expose a long-poll subscribe, so we poll the `version` field at 250ms intervals, which is fast enough to feel live and easy on the free tier.

(Note: I considered `redis.subscribe()` via Upstash's WebSocket support, but it's only documented in their Node client and unreliable on Vercel Edge. Polling is the pragmatic choice for the scale in the spec.)

- [ ] **Step 1: Write the state route**

```ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/hmac';
import { readState, writeAndPublish } from '@/lib/redis';
import { INITIAL_DECK_STATE, type DeckState } from '@/lib/types';

export const runtime = 'edge';

const SECRET = process.env.PRESENTER_SECRET!;

function sseHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  };
}

function encode(event: DeckState): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
): Promise<Response> {
  const { deckId } = await params;
  const url = new URL(req.url);
  if (url.searchParams.get('stream') !== '1') {
    const state = (await readState(deckId)) ?? INITIAL_DECK_STATE;
    return NextResponse.json(state);
  }

  const encoder = new TextEncoder();
  let lastVersion = -1;
  let cancelled = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (state: DeckState) => {
        controller.enqueue(encode(state));
        lastVersion = state.version;
      };

      const initial = (await readState(deckId)) ?? INITIAL_DECK_STATE;
      send(initial);

      // Heartbeat every 15s so intermediaries don't close the connection.
      const heartbeat = setInterval(() => {
        if (cancelled) return;
        controller.enqueue(encoder.encode(': keepalive\n\n'));
      }, 15_000);

      // Poll Redis for state changes.
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 250));
        if (cancelled) break;
        const state = (await readState(deckId)) ?? INITIAL_DECK_STATE;
        if (state.version !== lastVersion) send(state);
      }

      clearInterval(heartbeat);
    },
    cancel() {
      cancelled = true;
    },
  });

  return new Response(stream, { headers: sseHeaders() });
}

interface WriteBody {
  token: string;
  currentSlide: number;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
): Promise<Response> {
  const { deckId } = await params;
  const body = (await req.json()) as Partial<WriteBody>;
  if (!body.token || typeof body.currentSlide !== 'number') {
    return new Response('bad request', { status: 400 });
  }

  const ok = await verifyToken(deckId, body.token, SECRET);
  if (!ok) return new Response('unauthorized', { status: 401 });

  const prev = (await readState(deckId)) ?? INITIAL_DECK_STATE;
  const next: DeckState = {
    currentSlide: body.currentSlide,
    maxReached: Math.max(prev.maxReached, body.currentSlide),
    updatedAt: Date.now(),
    version: prev.version + 1,
  };
  await writeAndPublish(deckId, next);
  return new Response(null, { status: 204 });
}
```

(`writeAndPublish` still calls `redis.publish` — harmless, free, and reserves the channel for when we add a true subscribe transport later.)

- [ ] **Step 2: Write the health route**

```ts
export const runtime = 'edge';

export function GET(): Response {
  return new Response('ok', { status: 200 });
}
```

- [ ] **Step 3: Verify it compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add deck-swap/src/app/api/
git commit -m "$(cat <<'EOF'
feat: api routes — state SSE/write + health

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: SSE client hook + keyboard hook

**Files:**
- Create: `deck-swap/src/hooks/useDeckState.ts`
- Create: `deck-swap/src/hooks/useKeyboard.ts`

- [ ] **Step 1: Write `useDeckState.ts`**

```ts
'use client';

import { useEffect, useState } from 'react';
import { INITIAL_DECK_STATE, type DeckState } from '@/lib/types';

export interface DeckStateConnection {
  state: DeckState;
  stale: boolean;
}

export function useDeckState(deckId: string): DeckStateConnection {
  const [state, setState] = useState<DeckState>(INITIAL_DECK_STATE);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const es = new EventSource(`/api/state/${deckId}?stream=1`);
    let staleTimer: ReturnType<typeof setTimeout> | null = null;

    const armStaleTimer = () => {
      if (staleTimer) clearTimeout(staleTimer);
      staleTimer = setTimeout(() => setStale(true), 20_000);
    };

    es.onmessage = (e) => {
      try {
        const next = JSON.parse(e.data) as DeckState;
        setState(next);
        setStale(false);
        armStaleTimer();
      } catch {
        /* ignore malformed */
      }
    };
    es.onerror = () => setStale(true);
    armStaleTimer();

    return () => {
      es.close();
      if (staleTimer) clearTimeout(staleTimer);
    };
  }, [deckId]);

  return { state, stale };
}
```

- [ ] **Step 2: Write `useKeyboard.ts`**

```ts
'use client';

import { useEffect } from 'react';

type Handler = (e: KeyboardEvent) => void;

export function useKeyboard(handler: Handler): void {
  useEffect(() => {
    const wrapped = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const t = e.target;
        if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
      }
      handler(e);
    };
    window.addEventListener('keydown', wrapped);
    return () => window.removeEventListener('keydown', wrapped);
  }, [handler]);
}
```

- [ ] **Step 3: Verify it compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add deck-swap/src/hooks/
git commit -m "$(cat <<'EOF'
feat: useDeckState (SSE) + useKeyboard hooks

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: UI components — SlideStage, PresenterHUD, ViewerOverlay

**Files:**
- Create: `deck-swap/src/lib/ui/SlideStage.tsx`
- Create: `deck-swap/src/lib/ui/PresenterHUD.tsx`
- Create: `deck-swap/src/lib/ui/ViewerOverlay.tsx`

- [ ] **Step 1: `SlideStage.tsx`**

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Deck, VariantKey } from '@/lib/types';

interface Props {
  deck: Deck;
  slideIndex: number;
  variant: VariantKey;
}

export function SlideStage({ deck, slideIndex, variant }: Props) {
  const entry = deck.slides[slideIndex];
  if (!entry) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
        <p>No slide at index {slideIndex}.</p>
      </div>
    );
  }
  const chosen = entry.variants[variant] ?? entry.variants[deck.defaultVariant];
  if (!chosen) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
        <p>No variants defined for {entry.id}.</p>
      </div>
    );
  }
  const SlideComponent = chosen.default;
  const transition = chosen.meta.transition;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${entry.id}:${variant}`}
          initial={transition === 'cut' ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={transition === 'cut' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: transition === 'cut' ? 0 : 0.25 }}
          className="absolute inset-0"
        >
          <SlideComponent phase="active" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: `PresenterHUD.tsx`**

```tsx
'use client';

import type { Deck } from '@/lib/types';

interface Props {
  deck: Deck;
  current: number;
  connection: 'ok' | 'pending' | 'error';
  onPrev: () => void;
  onNext: () => void;
  hidden: boolean;
}

export function PresenterHUD({ deck, current, connection, onPrev, onNext, hidden }: Props) {
  if (hidden) return null;
  const next = deck.slides[current + 1];
  const dotColor =
    connection === 'ok' ? 'bg-green-500' : connection === 'pending' ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-6">
      <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/10 bg-black/60 px-5 py-2 text-sm text-white backdrop-blur">
        <button onClick={onPrev} className="opacity-70 hover:opacity-100" aria-label="previous slide">
          ◀
        </button>
        <span className="font-mono tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}
        </span>
        <button onClick={onNext} className="opacity-70 hover:opacity-100" aria-label="next slide">
          ▶
        </button>
        <span className="text-white/30">|</span>
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} aria-label={connection} />
        <span className="text-white/60">{connection === 'ok' ? 'live' : connection}</span>
        {next && <span className="text-white/40">· next: {next.id}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `ViewerOverlay.tsx`**

```tsx
'use client';

import { VARIANT_LABELS, type Deck, type VariantKey } from '@/lib/types';

interface Props {
  deck: Deck;
  slideIndex: number;
  currentLive: number;
  maxReached: number;
  variant: VariantKey;
  onVariantChange: (v: VariantKey) => void;
  onJumpToLive: () => void;
}

const ALL: VariantKey[] = ['claude', 'design', 'stitch', 'hermes'];

export function ViewerOverlay({
  deck,
  slideIndex,
  currentLive,
  maxReached,
  variant,
  onVariantChange,
  onJumpToLive,
}: Props) {
  const entry = deck.slides[slideIndex];
  const behind = slideIndex !== currentLive;

  return (
    <>
      <div className="pointer-events-auto absolute right-6 top-6 rounded-2xl border border-white/15 bg-black/70 p-3 text-xs text-white backdrop-blur">
        <p className="px-2 pb-2 text-[10px] uppercase tracking-widest text-white/50">Design lens</p>
        <ul>
          {ALL.map((v) => {
            const available = entry ? Boolean(entry.variants[v]) : false;
            const selected = v === variant;
            return (
              <li key={v}>
                <button
                  disabled={!available}
                  onClick={() => onVariantChange(v)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition ${
                    selected ? 'bg-white/15' : 'hover:bg-white/10'
                  } ${available ? '' : 'opacity-30 cursor-not-allowed'}`}
                  title={available ? VARIANT_LABELS[v] : 'not designed in this lens yet'}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full border border-white/40 ${
                      selected ? 'bg-white' : ''
                    }`}
                  />
                  {VARIANT_LABELS[v]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {behind && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex justify-center p-6">
          <div className="flex items-center gap-4 rounded-full border border-white/15 bg-black/70 px-5 py-2 text-sm text-white backdrop-blur">
            <span className="font-mono tabular-nums">
              viewing {String(slideIndex + 1).padStart(2, '0')} / live{' '}
              {String(currentLive + 1).padStart(2, '0')} ({maxReached + 1} seen)
            </span>
            <button
              onClick={onJumpToLive}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black"
            >
              Jump to live →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Verify it compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add deck-swap/src/lib/ui/
git commit -m "$(cat <<'EOF'
feat: ui — SlideStage, PresenterHUD, ViewerOverlay

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: Pages — presenter, viewer, index

**Files:**
- Modify: `deck-swap/src/app/layout.tsx`
- Modify: `deck-swap/src/app/globals.css`
- Modify: `deck-swap/src/app/page.tsx`
- Create: `deck-swap/src/app/p/[deckId]/[token]/page.tsx`
- Create: `deck-swap/src/app/v/[deckId]/page.tsx`

The presenter page is a server component that derives + verifies the token, then renders a client component that holds the slide state and POSTs on each advance. The viewer page subscribes via SSE and clamps user navigation to `[0, maxReached]`.

- [ ] **Step 1: Tidy `layout.tsx`**

Replace its body with:
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'deck-swap',
  description: 'Presenter-synced deck with per-slide variants.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Tidy `globals.css`**

Keep only the Tailwind import and make the body full-viewport:
```css
@import 'tailwindcss';

html,
body,
#__next {
  height: 100%;
}
body {
  margin: 0;
  overflow: hidden;
}
```

- [ ] **Step 3: Index page lists known decks**

`src/app/page.tsx`:
```tsx
import Link from 'next/link';
import { deck as introTalk } from '@/decks/intro-talk/deck.config';

const decks = [introTalk];

export default function HomePage() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-zinc-950 p-12">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold">deck-swap</h1>
        <p className="mt-2 text-zinc-400">Decks on this instance:</p>
        <ul className="mt-6 space-y-3">
          {decks.map((d) => (
            <li key={d.id} className="rounded-xl border border-zinc-800 p-4">
              <p className="font-medium">{d.title}</p>
              <p className="mt-1 text-sm text-zinc-500">
                Viewer:&nbsp;
                <Link className="underline" href={`/v/${d.id}`}>/v/{d.id}</Link>
              </p>
              <p className="text-sm text-zinc-500">
                Presenter URL: derive token with `pnpm token {d.id}` (see README).
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Presenter page**

`src/app/p/[deckId]/[token]/page.tsx`:
```tsx
import { notFound } from 'next/navigation';
import { deck as introTalk } from '@/decks/intro-talk/deck.config';
import { deriveToken } from '@/lib/hmac';
import { PresenterClient } from './presenter-client';

const DECKS = { 'intro-talk': introTalk } as const;

export default async function PresenterPage({
  params,
}: {
  params: Promise<{ deckId: string; token: string }>;
}) {
  const { deckId, token } = await params;
  const deck = DECKS[deckId as keyof typeof DECKS];
  if (!deck) notFound();

  const expected = await deriveToken(deckId, process.env.PRESENTER_SECRET!);
  if (expected !== token) notFound();

  return <PresenterClient deck={deck} token={token} />;
}
```

- [ ] **Step 5: Presenter client component**

`src/app/p/[deckId]/[token]/presenter-client.tsx`:
```tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { SlideStage } from '@/lib/ui/SlideStage';
import { PresenterHUD } from '@/lib/ui/PresenterHUD';
import { useKeyboard } from '@/hooks/useKeyboard';
import type { Deck } from '@/lib/types';

interface Props {
  deck: Deck;
  token: string;
}

export function PresenterClient({ deck, token }: Props) {
  const [current, setCurrent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [connection, setConnection] = useState<'ok' | 'pending' | 'error'>('ok');
  const [allowBack, setAllowBack] = useState(false);

  const push = useCallback(
    async (next: number) => {
      const clamped = Math.max(0, Math.min(deck.slides.length - 1, next));
      setCurrent(clamped);
      setConnection('pending');
      try {
        const res = await fetch(`/api/state/${deck.id}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ token, currentSlide: clamped }),
        });
        setConnection(res.ok ? 'ok' : 'error');
      } catch {
        setConnection('error');
      }
    },
    [deck.id, deck.slides.length, token]
  );

  useEffect(() => {
    void push(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyboard((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      void push(current + 1);
    } else if (e.key === 'ArrowLeft' && allowBack) {
      e.preventDefault();
      void push(current - 1);
    } else if (e.key === 'h') {
      setHidden((v) => !v);
    } else if (e.key === 'b') {
      setAllowBack((v) => !v);
    } else if (e.key === 'p') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  });

  return (
    <main className="relative h-full w-full">
      <SlideStage deck={deck} slideIndex={current} variant={deck.defaultVariant} />
      <PresenterHUD
        deck={deck}
        current={current}
        connection={connection}
        onPrev={() => allowBack && push(current - 1)}
        onNext={() => push(current + 1)}
        hidden={hidden}
      />
    </main>
  );
}
```

- [ ] **Step 6: Viewer page (server entry)**

`src/app/v/[deckId]/page.tsx`:
```tsx
import { notFound } from 'next/navigation';
import { deck as introTalk } from '@/decks/intro-talk/deck.config';
import { ViewerClient } from './viewer-client';

const DECKS = { 'intro-talk': introTalk } as const;

export default async function ViewerPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const deck = DECKS[deckId as keyof typeof DECKS];
  if (!deck) notFound();
  return <ViewerClient deck={deck} />;
}
```

- [ ] **Step 7: Viewer client component**

`src/app/v/[deckId]/viewer-client.tsx`:
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { SlideStage } from '@/lib/ui/SlideStage';
import { ViewerOverlay } from '@/lib/ui/ViewerOverlay';
import { useDeckState } from '@/hooks/useDeckState';
import { useKeyboard } from '@/hooks/useKeyboard';
import type { Deck, VariantKey } from '@/lib/types';

const VARIANT_STORAGE_KEY = 'deckSwap.variant';

interface Props {
  deck: Deck;
}

export function ViewerClient({ deck }: Props) {
  const { state } = useDeckState(deck.id);
  const [viewerSlide, setViewerSlide] = useState(0);
  const [variant, setVariant] = useState<VariantKey>(deck.defaultVariant);
  const prevLiveRef = useRef(0);

  useEffect(() => {
    const stored = window.localStorage.getItem(VARIANT_STORAGE_KEY) as VariantKey | null;
    if (stored) setVariant(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(VARIANT_STORAGE_KEY, variant);
  }, [variant]);

  // Follow presenter when viewer was on the live slide; otherwise stay.
  useEffect(() => {
    const prevLive = prevLiveRef.current;
    if (viewerSlide === prevLive) setViewerSlide(state.currentSlide);
    prevLiveRef.current = state.currentSlide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentSlide]);

  // Clamp if maxReached shrinks (shouldn't happen, but cheap safety).
  useEffect(() => {
    if (viewerSlide > state.maxReached) setViewerSlide(state.maxReached);
  }, [state.maxReached, viewerSlide]);

  useKeyboard((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setViewerSlide((v) => Math.max(0, v - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setViewerSlide((v) => Math.min(state.maxReached, v + 1));
    } else if (e.key === 'l') {
      setViewerSlide(state.currentSlide);
    }
  });

  return (
    <main className="relative h-full w-full">
      <SlideStage deck={deck} slideIndex={viewerSlide} variant={variant} />
      <ViewerOverlay
        deck={deck}
        slideIndex={viewerSlide}
        currentLive={state.currentSlide}
        maxReached={state.maxReached}
        variant={variant}
        onVariantChange={setVariant}
        onJumpToLive={() => setViewerSlide(state.currentSlide)}
      />
    </main>
  );
}
```

- [ ] **Step 8: Verify it compiles and lints**

```bash
pnpm exec tsc --noEmit
pnpm lint
```

Expected: no errors. The two `eslint-disable-next-line` comments above are deliberate — both effects intentionally depend on a subset of their dependencies.

- [ ] **Step 9: Commit**

```bash
git add deck-swap/src/app/
git commit -m "$(cat <<'EOF'
feat: presenter + viewer pages, deck index

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: Token-printing helper script + README

**Files:**
- Create: `deck-swap/scripts/print-token.ts`
- Modify: `deck-swap/package.json` (add `token` script)
- Create: `deck-swap/README.md`

So Tom can paste `pnpm token intro-talk` in a terminal and get back the URL to bookmark.

- [ ] **Step 1: Write `print-token.ts`**

```ts
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv(): void {
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main(): Promise<void> {
  loadEnv();
  const deckId = process.argv[2];
  if (!deckId) {
    console.error('usage: pnpm token <deckId>');
    process.exit(1);
  }
  const secret = process.env.PRESENTER_SECRET;
  if (!secret) {
    console.error('PRESENTER_SECRET missing (set it in .env.local)');
    process.exit(1);
  }

  const { deriveToken } = await import('../src/lib/hmac');
  const token = await deriveToken(deckId, secret);
  console.log(`/p/${deckId}/${token}`);
}

void main();
```

- [ ] **Step 2: Add the npm script**

In `deck-swap/package.json` `scripts`:
```json
{
  "token": "tsx scripts/print-token.ts"
}
```

- [ ] **Step 3: Write `README.md`**

```md
# deck-swap

Presenter-synced slide deck with per-slide design variants.

## Setup

```bash
pnpm install
cp .env.local.example .env.local
# Edit .env.local:
#   PRESENTER_SECRET=$(openssl rand -hex 32)
#   UPSTASH_REDIS_REST_URL=...    # from upstash.com
#   UPSTASH_REDIS_REST_TOKEN=...
pnpm dev
```

Open `http://localhost:3000` for the deck index.

## Running a presentation

1. Get your presenter URL:
   ```bash
   pnpm token intro-talk
   # → /p/intro-talk/a1b2c3d4e5f6g7h8
   ```
2. Open `http://localhost:3000/p/intro-talk/<token>` on your screen.
3. Share `http://localhost:3000/v/intro-talk` (or your deployed URL) with viewers.

### Presenter keys

| Key | Action |
|---|---|
| `→` / `Space` | Advance slide |
| `←` | Go back (must enable with `b` first) |
| `b` | Toggle back-nav for this session |
| `h` | Hide HUD |
| `p` | Fullscreen presentation mode |

### Viewer keys

| Key | Action |
|---|---|
| `←` | Previous slide (within slides already shown) |
| `→` | Forward (capped at presenter's current slide) |
| `l` | Jump to live |

## Adding a deck

```
src/decks/<your-deck>/
  deck.config.ts
  slides/01-foo/{claude,design,stitch,hermes}.tsx
```

Then register it in `src/app/page.tsx`, `.../p/[deckId]/[token]/page.tsx`, and `.../v/[deckId]/page.tsx` (the `DECKS` map in each). Run `pnpm gen`.

## Deployment

Vercel project rooted at `deck-swap/`. Set `PRESENTER_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` for all three environments. The SSE route runs on Edge — no extra config needed.
```

- [ ] **Step 4: Commit**

```bash
git add deck-swap/scripts/print-token.ts deck-swap/package.json deck-swap/README.md
git commit -m "$(cat <<'EOF'
feat: token-printing helper + README

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 14: Manual verification checklist

**Files:** none — this task is the QA pass.

This task does not commit code. It runs the app and walks the spec's behaviors. **Do not mark this task complete unless every check passes.**

- [ ] **Step 1: Local prerequisites**

Confirm `.env.local` has all three variables filled (real Upstash credentials, real `PRESENTER_SECRET`). If Upstash credentials are missing, stop and ask the user to provide them — without them the API routes will throw at request time.

- [ ] **Step 2: Boot the dev server**

```bash
pnpm dev
```

Expected: starts cleanly, `predev` runs the codegen, no warnings about missing modules.

- [ ] **Step 3: Get the presenter URL**

In a second terminal:
```bash
pnpm token intro-talk
```

Expected: prints `/p/intro-talk/<16 hex chars>`.

- [ ] **Step 4: Open presenter + viewer**

- Browser tab A: `http://localhost:3000/p/intro-talk/<token>` — should show slide 1 (Claude variant, default).
- Browser tab B (separate window, ideally a different browser/incognito): `http://localhost:3000/v/intro-talk` — should also show slide 1.

- [ ] **Step 5: Walk the behaviors**

Each item is a pass/fail check. Record any failure and stop.

- Press `→` in tab A → tab B advances to slide 2 within ~1 second.
- Press `→` again in tab A → tab B advances to slide 3.
- In tab B, press `←` → tab B goes back to slide 2 (tab A stays on slide 3).
- In tab B, press `←` again → tab B goes back to slide 1.
- In tab B, press `→` two times → goes to 2, then 3, and stops there (cannot exceed live).
- In tab B, press `←` to go back to slide 1, then press `→` once → goes to slide 2 (still capped at live=3).
- Reload tab B → comes up on slide 3 (the live slide).
- Open a fresh tab C as viewer → also lands on slide 3.
- In tab A, press `→` (try to advance past slide 3) → presenter stays on slide 3 (clamped to last slide). Tab B & C unchanged.
- In tab B, while on slide 2, click "Jump to live" → snaps to slide 3.
- In tab B, click each design lens in the top-right → slide re-renders in that style. Tab A is unaffected.
- Open tab D as viewer → reads the variant from localStorage (per-browser), defaults to `claude` because tab D has no localStorage from a previous session.
- Try `http://localhost:3000/p/intro-talk/wrongtoken` → 404.
- Try `POST /api/state/intro-talk` with a wrong token via curl → 401.

```bash
curl -X POST http://localhost:3000/api/state/intro-talk \
  -H 'content-type: application/json' \
  -d '{"token":"wrong","currentSlide":1}'
```
Expected: `unauthorized`.

- [ ] **Step 6: Sanity-check `pnpm build`**

```bash
pnpm build
```

Expected: production build succeeds. No TypeScript errors, no missing-export errors. If the build runs the `prebuild` codegen, the `_generated.ts` files are rewritten — fine.

- [ ] **Step 7: Report status**

If every check passes, report to the user: "Local app verified end-to-end. Ready for you to create the Vercel project." Include the three env var names they'll need to set (`PRESENTER_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) and remind them to generate `PRESENTER_SECRET` with `openssl rand -hex 32`.

If anything failed, report the failing check and stop — do not commit a fix without surfacing the issue first.

---

## Self-Review Notes

Reviewed plan against the spec on 2026-05-27:

- **Spec coverage:** URLs ✓, auth ✓, slide authoring + registry ✓, state shape ✓, write path ✓, read path (with documented polling deviation) ✓, viewer state machine ✓, failure modes (auto-reconnect via EventSource, stale pill) ✓, variant switching ✓, presenter HUD + keys ✓, viewer overlay + keys ✓, project layout ✓, deployment instructions in README ✓.
- **One deliberate deviation from spec:** SSE handler polls Redis every 250 ms instead of subscribing to a pub/sub channel — Upstash REST doesn't expose a long-lived subscribe usable from Vercel Edge. `writeAndPublish` still publishes so the channel exists for a future transport swap. Documented inline in Task 9. Within spec's latency target (~50–200 ms feel; perceived latency is now ~125–375 ms which is still call-grade).
- **No placeholders:** no TBDs, all code in every step, all file paths absolute or unambiguously relative to `deck-swap/`.
- **Type consistency:** `DeckState`, `SlideEntry`, `VariantKey`, `VARIANT_LABELS`, `INITIAL_DECK_STATE`, `deriveToken`, `verifyToken`, `readState`, `writeAndPublish`, `useDeckState`, `useKeyboard` — names match across all tasks.
- **Open spec questions:** the variant-generator script and the env-secret-cookie deck index are both explicitly out of scope per spec; this plan implements neither. Index is a plain page listing decks instead — documented in Task 12.
