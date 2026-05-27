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
   pnpm presenter-url intro-talk
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
