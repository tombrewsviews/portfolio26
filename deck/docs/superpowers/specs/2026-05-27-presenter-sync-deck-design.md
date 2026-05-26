# Presenter-Synced Deck — Design Spec

**Status:** Draft for review
**Date:** 2026-05-27
**Owner:** Tom Parandyk

## Problem

When presenting on a call, Tom wants to share a single URL with attendees so they see exactly the slide he is on. Viewers must not be able to move ahead, but can:

- scroll back through slides he has already shown,
- switch between several pre-designed visual "lenses" (variants) of each slide produced by different design agents (Claude Code + Skills, Claude Design, Google Stitch, Hermès),
- snap back to the live slide at any time.

When Tom advances a slide, every viewer who is on the live slide follows; viewers who scrolled back stay where they are until they tap "Jump to live".

## Goals

- Zero-friction sharing: one URL for viewers, one URL for presenter; no logins.
- Real-time enough to feel synchronous on a video call (~50–200 ms perceived latency).
- Each viewer can independently change the design lens without affecting others.
- $0 runtime cost at 1–5 viewers; deploys on Vercel like the rest of Tom's projects.
- Authoring slides in code (React/TSX) so animations and embeds can match the quality bar of the portfolio.

## Non-goals

- Viewer chat, reactions, polls, or any audience-interactivity beyond lens switching.
- Presenter back-navigation (out of scope for v1; schema accommodates it later).
- Variants generated at runtime; all variants are static, committed to the repo.
- Audiences larger than ~30; if a talk grows, swap the SSE transport for Partykit/Ably without changing the slide or viewer code.
- Multi-presenter / co-host handoff.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router, TypeScript |
| Slides | React/TSX components (MDX optional later) |
| Sync transport | Server-Sent Events on Vercel Edge runtime |
| State store | Upstash Redis (free tier) with pub/sub |
| Presenter auth | HMAC-derived URL token, no login UI |
| Transitions | Framer Motion `AnimatePresence`, per-slide opt-in |
| Hosting | Vercel (Edge for SSE route, Node for KV writes) |
| Package manager | pnpm |

Why this stack: matches Tom's existing Vercel + React workflow, free at this scale, and SSE-over-Edge is well-trodden. Pub/sub via Upstash lets the SSE handler fan out without polling.

## URLs

```
/                          Deck index, gated by env secret cookie
/p/[deckId]/[token]        Presenter view  (only Tom holds this URL)
/v/[deckId]                Viewer view     (the URL shared on the call)
/api/state/[deckId]        GET ?stream=1 (SSE) + POST (presenter writes)
/api/health                Liveness check
```

`token = hmac_sha256(deckId, PRESENTER_SECRET).slice(0, 16)`. Deterministic, so a presenter URL is bookmarkable; rotation = change the secret.

## Slide Authoring

```
src/decks/<deckId>/
  deck.config.ts          # title, slide order, defaultVariant
  _generated.ts           # codegen output (do not edit)
  slides/
    01-hello/
      claude.tsx          # variant: "Claude Code + Skills"
      design.tsx          # variant: "Claude Design"
      stitch.tsx          # variant: "Google Stitch"
      hermes.tsx          # variant: "Hermès"
      _shared.ts          # optional shared content/data
    02-problem/
      ...
```

**Slide contract** — every variant default-exports a `Slide` component and a `meta` object:

```ts
export default function Slide({ phase }: SlideProps) { ... }
export const meta = {
  id: '01-hello',
  variant: 'claude' | 'design' | 'stitch' | 'hermes',
  transition: 'fade' | 'cut' | 'custom',
};
```

**Registry** is generated at build time by `scripts/gen-registry.ts` (runs in `predev` and `prebuild`). It reads the slides folder and emits `_generated.ts` with static imports of every variant, producing a type-safe `Deck` object that the presenter and viewer pages both consume.

**Missing variants:** if `slides/05-foo/hermes.tsx` doesn't exist, the registry omits it; the variant overlay greys out that option for that slide with a tooltip ("not designed in this lens yet"). Viewer falls back to `defaultVariant`. No build error.

**Why static imports, not dynamic glob:** all variants ship in the JS bundle so viewer lens switching is instantaneous with no network. If a deck ever grows to ~50 slides × 4 variants and bundle size hurts, switch to `React.lazy` per variant. Don't do it preemptively.

## Sync Architecture

### State (one Redis key per deck)

```ts
// key: deck:<deckId>
{
  currentSlide: number,    // presenter's current index — source of truth
  maxReached: number,      // === currentSlide in v1; separate field reserves space for future presenter back-nav
  updatedAt: number,       // ms timestamp, for stale-client detection
  version: number,         // monotonic counter, incremented on every write
}
```

### Write path (presenter → server)

```
Presenter presses → / ↓ / →
   POST /api/state/[deckId] { token, currentSlide: 7 }
   ↓
Edge function:
   1. verify HMAC(deckId, PRESENTER_SECRET) === token  → 401 otherwise
   2. redis.set("deck:<deckId>", { ...newState })
   3. redis.publish("deck:<deckId>:events", JSON.stringify(state))
   4. 204
```

### Read path (viewer → server, via SSE)

```
Viewer loads /v/[deckId]:
   1. EventSource: GET /api/state/[deckId]?stream=1   (Edge, no timeout)
   2. server subscribes to "deck:<deckId>:events" on Upstash
   3. server emits initial snapshot, then every published event as
      data: {...state}\n\n
   4. client applies state → React re-renders to that slide
```

### Viewer state machine

```
viewerSlide ≤ maxReached  → render slide; ← → navigable within [0, maxReached]
viewerSlide > maxReached  → snap to maxReached (cannot peek ahead)
"Jump to live" button     → viewerSlide = currentSlide  (visible only when != current)

on new event from server (currentSlide advances):
   if viewerSlide was on previous currentSlide → follow (set viewerSlide = new currentSlide)
   if viewerSlide < currentSlide               → stay; show "live • slide N" pill
```

This produces the desired behavior: viewers who don't touch anything track Tom automatically; viewers who scrolled back to review stay back until they tap "Jump to live".

### Failure modes

- **Viewer connection drops** → EventSource auto-reconnects. On reopen, server sends current snapshot first, then resumes events. No replay logic needed (state is monotonic).
- **Upstash down** → presenter POST returns 5xx; presenter HUD shows red dot. Viewers keep their last-known slide. Tom can keep talking; sync resumes on recovery.
- **Two presenter tabs open** → last-write-wins. Acceptable.
- **Stale viewer** (`updatedAt` > 10s old with no events received) → small "reconnecting…" pill.

### Variant switching

Pure client-side. Overlay control writes `localStorage.variant`; React re-renders the current slide using the chosen variant from the registry. Never hits the server. Each viewer's choice is independent.

## UI Surfaces

### Presenter view — `/p/[deckId]/[token]`

- Full-bleed current slide (always rendered with the default variant — viewer lens choices don't affect the presenter).
- Bottom HUD: `◀ 07 / 24 ▶   ●live   •   next: "Problem"`.
- Tiny next-slide thumbnail in the HUD.
- Green/red connection dot reflecting last POST status (< 2 s = green).
- Keys:
  - `→` / `Space` — advance
  - `←` — back (disabled by default to enforce monotonic model; `b` toggles it on for the session)
  - `h` — hide HUD
  - `p` — present mode (fullscreen + cursor hide)

### Viewer view — `/v/[deckId]`

- Slide content rendered in the viewer's chosen variant.
- Top-right **Design lens** overlay (collapses to a pill when idle):
  - radio list of variants; disabled variants greyed with tooltip.
- Bottom bar shown only when behind live:
  - `◀ 05 / 07 seen        [● Jump to live →]`
- Keys: `←` back, `→` forward (capped at `maxReached`), `l` jump to live.

## Project Layout

```
deck/
  src/
    app/
      page.tsx
      p/[deckId]/[token]/page.tsx
      v/[deckId]/page.tsx
      api/
        state/[deckId]/route.ts     # GET (SSE) + POST
        health/route.ts
    decks/
      <deckId>/
        deck.config.ts
        _generated.ts               # codegen output
        slides/...
    lib/
      registry.ts                   # types + codegen runner
      sync/
        client.ts                   # useDeckState() SSE hook
        server.ts                   # redis client, hmac, broadcast
      ui/
        SlideStage.tsx              # variant resolver + transition wrapper
        PresenterHUD.tsx
        VariantOverlay.tsx
        LivePill.tsx
  scripts/
    gen-registry.ts                 # runs in predev/prebuild
  docs/superpowers/specs/
  .env.local
  next.config.mjs
  package.json
```

## Deployment

- Vercel project rooted at `deck/` (subdirectory of the existing repo).
- Env vars (Vercel dashboard, all three environments):
  - `PRESENTER_SECRET` — random 32+ byte string, never rotated lightly (rotation invalidates every presenter URL).
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Upstash Redis free tier (region matching the Vercel deployment region).
- SSE route runs on Edge runtime (`export const runtime = 'edge'`).
- Custom domain optional (`deck.<domain>` if available).
- Preview deployments on every push — useful for iterating on freshly-generated variants before a talk.
- Runtime cost at target scale: $0.

## Running a Presentation

1. **Before the call:** author or regenerate the variants you want — for v1 this means hand-writing or pasting `.tsx` files into `slides/<id>/<variant>.tsx`. Commit, push. Vercel auto-deploys. (A scripted `pnpm gen:variants` that drives the design agents is a follow-up — see Open Questions.)
2. **On the call:** open `/p/<deckId>/<token>` on Tom's screen, paste `/v/<deckId>` in chat.
3. **Drive** with arrow keys. Viewers see what Tom sees by default; some flip lenses; some scroll back to a previous slide; all can snap forward with "Jump to live".

## Open Questions for Implementation Phase

- **Variant generator integration:** `pnpm gen:variants` is described above but the actual agent-invocation script is out of scope for this spec. It belongs in its own design once we have a few hand-authored variants to learn the slide shape from.
- **MDX vs pure TSX:** start pure TSX. If authoring friction shows up, add MDX support (it's a `next.config.mjs` flag).
- **First deck content:** pick one short real talk to drive v1, rather than scaffolding empty.
