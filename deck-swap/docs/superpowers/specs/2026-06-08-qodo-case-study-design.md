# Qodo Case Study (Case 03) — "Agentic state & the unhappy path"

**Date:** 2026-06-08
**Deck:** `intro-talk` (deck-swap)
**Goal:** Add a third case study after Tessl, framed to target the Guidepoint "Senior Interactive Designer — Agentic Workflows" JD. Spine = designing how a non-deterministic agent communicates state and hands control back to the human (the "unhappy path").

## Why this framing

Guidepoint's brief is: exception surfacing, decision prompts, status communication, escalation/handoff, notification patterns for an **internal agentic workflow system** — the "unhappy path" is the entire design problem. The Qodo work maps directly: a non-deterministic test agent whose UI must make `Fixing` / `Generating` / `Failed` / `Passed` legible, surface happy-path vs edge-cases, run an autonomous mode, and defer to the operator at the right moment. Two real shots (`Tabs, Plan.jpg`, `Tabs, Behaviours.jpg`) show exactly this state vocabulary.

## Content source (verbatim from portfolio-react `src/content/projects.ts`)

- **Title/subtitle:** Qodo — AI Code Generation · 2022–2025
- **Role:** Founding Product Designer / Design Engineer. "Took it from zero to 300K installs in a year — the solo designer across every touchpoint, and a design engineer in the production codebase."
- **Metrics:** 2M agent installs · 4M PR reviews · 500K users
- **About:** "AI code generation and review in the developer workflow, with the first agents designed in the terminal before Claude Code was released. Spanned the review and PR-agent surfaces, AI research and model fine-tuning, and on-prem deployment."
- **Relevant challenges:** Trust in AI output; Agentic behaviour ("flows and tool calls for a non-deterministic chat state, where the same input can take different paths"); Platform management (context + prompt engineering driving the agents); On-prem.

## Placement & numbering

Insert **8 slides** between Tessl (ends `21-tessl-demo`) and the thank-you slide. New folders `22-qodo-*` … `29-qodo-*`. Existing `22-thank-you` → `30-thank-you`. Deck grows **22 → 30 slides**.

Registry is auto-generated from folder order by `scripts/gen-registry.ts` (run via `npm run gen` / `predev` / `prebuild`). No manual registry edits.

## The 8 slides (STAR)

| # | id | STAR | Content |
|---|----|------|---------|
| 22 | `22-qodo-title` | — | Dark `slide--ink` title. "Qodo. AI code generation in the developer's terminal." Case 03 · Founding Product Designer / Design Engineer · 2022–2025. |
| 23 | `23-qodo-problem` | S | "A non-deterministic agent. No stable state to show the human." `compare` two-col: *Deterministic tool* vs *Agentic test agent* (trust cost framing). |
| 24 | `24-qodo-role` | T | "Solo designer across every surface — and a design engineer in the production codebase." `timeline` of surfaces shipped: review → PR-agent → test-agent → on-prem admin. 0→300K installs in a year. |
| 25 | `25-qodo-state` | A | Core decision. "The hard part isn't the happy path — it's making Fixing, Generating, Failed legible." Left: state-vocabulary copy. Right: **`qodo-plan.jpg`** shot (autonomous mode, per-test state chips, agent narrating plan). |
| 26 | `26-qodo-handoff` | A | "Human-in-the-loop: where the agent defers." Happy-path / edge-cases / other-cases, Covered vs Generate-test — operator decides. Right: **`qodo-behaviors.jpg`** shot (coverage %, per-behavior states, prompt-to-change). |
| 27 | `27-qodo-outcome` | R | `metrics` grid: 2M installs · 4M PR reviews · 500K users. Honest-attribution note (design's contribution = agent state + trust surfaces). |
| 28 | `28-qodo-hindsight` | R | `duo` (What happened / What I do now): designed state reactively per-feature; would now define a shared, extensible state-vocabulary system up front (ties to Guidepoint "patterns hold as new workflows are added"). |
| 29 | `29-qodo-demo` | — | `flow` chips: Browse → Test plan → Agent runs → Fixing/Failed → Handoff → Approve. `DesignDemoFrame` to live Qodo. |

## Variants

Each slide gets both `design.tsx` (polished, rich layout — primary) and `claude.tsx` (minimal dark, eyebrow + heading + body/list), matching Tessl/Adlook. The two CSS systems differ: `deck-design/deck.css` has the rich vocabulary (`compare`, `timeline`, `metric`, `duo`, `flow`, `vm-*`); `deck/deck.css` (claude) is minimal (`slide__body`, `muted`, `accent`). So rich layouts live only in `design.tsx`.

## Images

Copy two shots from `portfolio-react/_originals/shots section/qodo/`:
- `Tabs, Plan.jpg` → `public/deck-design/shots/qodo-plan.jpg`
- `Tabs, Behaviours.jpg` → `public/deck-design/shots/qodo-behaviors.jpg`

Add a `.shot` figure class (bordered, rounded, object-fit cover) to `public/deck-design/deck.css` — no equivalent exists yet. Shots used only in the `design` variant.

## Edits to existing slides

- `03-agenda/design.tsx` + `claude.tsx`: "Two cases" → "Three cases"; add Case 03 card → `22-qodo-title`.
- **Footers:** all existing slides show `<b>NN</b> / 22`. Script a mechanical bump to `/ 30` and renumber the moved thank-you slide to `30`. Qodo slides authored directly with correct numbers. No copy changes.

## Verification

1. `npm run gen` regenerates `_generated.ts` with 30 slides, 8 new qodo entries.
2. `npm run build` (or `lint` + `tsc`) passes — no type errors, all imports resolve.
3. Visual: dev server, walk slides 22–29, confirm shots render and layouts match Tessl's polish.
4. Agenda Case 03 card navigates to `22-qodo-title`.
