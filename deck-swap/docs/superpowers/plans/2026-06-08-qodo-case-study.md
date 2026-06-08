# Qodo Case Study (Case 03) Implementation Plan

> **For agentic workers:** This plan is mostly static JSX slide authoring (no unit-test suite exists in this repo). Verification is `npm run gen` + `npm run build`/`lint` + visual walk. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add an 8-slide Qodo case study (Case 03) after Tessl, framed around agentic state and the unhappy path, targeting the Guidepoint JD.

**Architecture:** Each slide is a folder `src/decks/intro-talk/slides/NN-qodo-*/` with `design.tsx` (polished) + `claude.tsx` (minimal). Registry auto-generates from folder order via `scripts/gen-registry.ts`. Two CSS systems: `public/deck-design/deck.css` (rich) and `public/deck/deck.css` (claude). Existing `22-thank-you` renames to `30-thank-you`; all footers bump `/22 → /30`.

**Tech Stack:** Next.js 16, React 19, TypeScript, plain CSS (no Tailwind in deck).

---

### Task 1: Copy image assets + add `.shot` CSS

**Files:**
- Create: `public/deck-design/shots/qodo-plan.jpg`, `public/deck-design/shots/qodo-behaviors.jpg`
- Modify: `public/deck-design/deck.css` (append `.shot` rule)

- [ ] **Step 1: Copy the two state-rich shots**

```bash
cd "/Users/parandykt/CV/Portfolio 2026/Mar2026/v3/deck-swap"
mkdir -p public/deck-design/shots
cp "../portfolio-react/_originals/shots section/qodo/Tabs, Plan.jpg" public/deck-design/shots/qodo-plan.jpg
cp "../portfolio-react/_originals/shots section/qodo/Tabs, Behaviours.jpg" public/deck-design/shots/qodo-behaviors.jpg
ls -la public/deck-design/shots/
```
Expected: two jpg files listed.

- [ ] **Step 2: Append `.shot` figure class to deck-design CSS**

Append to `public/deck-design/deck.css`:
```css
.deck-design .shot { margin: 0; border: 1px solid var(--line); border-radius: var(--s-3); overflow: hidden; background: var(--paper-2); box-shadow: 0 8px 30px oklch(0 0 0 / 0.10); }
.deck-design .shot img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.deck-design .state-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-7); align-items: center; }
.deck-design .state-grid .shot { max-height: 62vh; }
```

- [ ] **Step 3: Commit**
```bash
git add public/deck-design/shots public/deck-design/deck.css
git commit -m "feat(qodo): add state shots + .shot/.state-grid css"
```

---

### Task 2: Slide 22 — qodo-title

**Files:** Create `src/decks/intro-talk/slides/22-qodo-title/design.tsx` + `claude.tsx`

- [ ] **Step 1: design.tsx** (dark title, mirrors 13-tessl-title/design)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '22-qodo-title',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.255 0.020 48)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--ink">
      <div className="slide-inner">
        <div className="section-index" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>03</div>
        <div className="slide-body">
          <div className="section-num" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Case 03</div>
          <h1 className="section-title" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Qodo.<span className="sub">AI code generation in the developer&rsquo;s terminal.</span>
          </h1>
          <div className="section-meta" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>Founding Product Designer / Design Engineer · 2022–2025</div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>22</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (mirrors 13-tessl-title/claude)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '22-qodo-title',
  variant: 'claude',
  transition: 'fade',
  bg: 'linear-gradient(180deg, oklch(0.22 0.04 280), oklch(0.16 0.02 280))',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--section is-active">
      <div className="slide__body">
        <div className="eyebrow">Case 03</div>
        <h1 className="display">Qodo.<br /><span className="muted">AI code generation in the developer&rsquo;s terminal.</span></h1>
        <div className="body body--lg mt-7 maxw-52">Founding Product Designer / Design Engineer · 2022–2025</div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>22 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git add` the folder + `git commit -m "feat(qodo): slide 22 title"`

---

### Task 3: Slide 23 — qodo-problem (Situation)

**Files:** Create `23-qodo-problem/design.tsx` + `claude.tsx`. Uses `compare` (exists in both CSS).

- [ ] **Step 1: design.tsx**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '23-qodo-problem',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The problem</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            A non-deterministic agent. <span className="coral serif-it">No stable state to show the human.</span>
          </h2>
          <div className="compare">
            <div className="compare__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="compare__head">Deterministic tool</div>
              <ul className="compare__list">
                <li>Same input, same output</li>
                <li>One status: ran or errored</li>
                <li>User reads the result, moves on</li>
                <li>Trust cost: <b>low</b></li>
              </ul>
            </div>
            <div className="compare__col compare__col--accent" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="compare__head">Agentic test agent</div>
              <ul className="compare__list">
                <li>Same input can take different paths</li>
                <li>Generating · Fixing · Passed · Failed — often at once</li>
                <li>Must say what it&rsquo;s doing, and when to step in</li>
                <li>Trust cost: <b>high — must be designed in</b></li>
              </ul>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>23</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (mirrors 14-tessl-problem/claude; `compare` with `accent` head)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '23-qodo-problem', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The problem</div>
        <h2 className="h2">A non-deterministic agent. No stable state to show the human.</h2>
        <div className="compare">
          <div className="compare__col">
            <div className="compare__head">Deterministic tool</div>
            <ul className="compare__list">
              <li>Same input, same output</li>
              <li>One status: ran or errored</li>
              <li>User reads the result, moves on</li>
              <li>Trust cost: low</li>
            </ul>
          </div>
          <div className="compare__col">
            <div className="compare__head accent">Agentic test agent</div>
            <ul className="compare__list">
              <li>Same input can take different paths</li>
              <li>Generating · Fixing · Passed · Failed — at once</li>
              <li>Must say what it&apos;s doing, and when to step in</li>
              <li>Trust cost: high — must be designed in</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>23 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 23 problem"`

---

### Task 4: Slide 24 — qodo-role (Task)

**Files:** Create `24-qodo-role/design.tsx` + `claude.tsx`. Uses `timeline`.

- [ ] **Step 1: design.tsx** (mirrors 15-tessl-speed/design; `tl-step/tl-when/tl-what`)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '24-qodo-role',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>My role</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Solo designer across every surface. <span className="coral serif-it">And a design engineer in the production codebase.</span>
          </h2>
          <div className="timeline">
            <div className="tl-step" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="tl-when">Start</div>
              <div className="tl-what">Joined as founding product designer. Agents first designed in the terminal — before Claude Code existed.</div>
            </div>
            <div className="tl-step" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="tl-when">Year 1</div>
              <div className="tl-what">Zero → 300K installs. Review surface, then the PR-agent.</div>
            </div>
            <div className="tl-step" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="tl-when">Scale</div>
              <div className="tl-what">Test-agent &amp; behavior coverage. AI research and model fine-tuning alongside design.</div>
            </div>
            <div className="tl-step tl-step--end" data-anim style={{ ['--d' as string]: 5 } as React.CSSProperties}>
              <div className="tl-when">Enterprise</div>
              <div className="tl-what">On-prem deployment + admin surfaces inside customer-controlled environments.</div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>24</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (mirrors 15-tessl-speed/claude; `timeline__step/when/what`)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '24-qodo-role', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">My role</div>
        <h2 className="h2">Solo designer across every surface. <span className="accent">And a design engineer in the production codebase.</span></h2>
        <div className="timeline">
          <div className="timeline__step">
            <div className="timeline__when">Start</div>
            <div className="timeline__what">Founding product designer. Agents first designed in the terminal — before Claude Code existed.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Year 1</div>
            <div className="timeline__what">Zero → 300K installs. Review surface, then the PR-agent.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Scale</div>
            <div className="timeline__what">Test-agent &amp; behavior coverage. AI research and model fine-tuning alongside design.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Enterprise</div>
            <div className="timeline__what">On-prem deployment + admin surfaces in customer-controlled environments.</div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>24 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 24 role"`

---

### Task 5: Slide 25 — qodo-state (Action 1, shot: qodo-plan)

**Files:** Create `25-qodo-state/design.tsx` + `claude.tsx`. Uses `state-grid` + `shot` (design only).

- [ ] **Step 1: design.tsx**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '25-qodo-state',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="state-grid">
            <div>
              <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The core decision</div>
              <h2 className="h2 maxw-24" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
                The hard part isn&rsquo;t the happy path. It&rsquo;s making <span className="coral serif-it">Fixing, Generating, Failed</span> legible.
              </h2>
              <p className="body maxw-46" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
                Each test carries its own live state. The plan narrates what the agent is doing and why. Autonomous mode runs ahead; the operator can interrupt at any step.
              </p>
            </div>
            <figure className="shot" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <img src="/deck-design/shots/qodo-plan.jpg" alt="Qodo test agent — test plan with per-test Passed, Fixing, and Generating states, autonomous mode toggle, and the agent narrating its plan" />
            </figure>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>25</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (no shot in claude CSS; use a state-chip list rendered with plain `compare`/text). Keep minimal:

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '25-qodo-state', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The core decision</div>
        <h2 className="h2 maxw-24">The hard part isn&apos;t the happy path. It&apos;s making <span className="accent">Fixing, Generating, Failed</span> legible.</h2>
        <p className="body body--lg maxw-46">Each test carries its own live state. The plan narrates what the agent is doing and why. Autonomous mode runs ahead; the operator can interrupt at any step.</p>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>25 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 25 agentic state"`

---

### Task 6: Slide 26 — qodo-handoff (Action 2, shot: qodo-behaviors)

**Files:** Create `26-qodo-handoff/design.tsx` + `claude.tsx`. Same `state-grid` + `shot` pattern as Task 5.

- [ ] **Step 1: design.tsx**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '26-qodo-handoff',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="state-grid">
            <figure className="shot" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>
              <img src="/deck-design/shots/qodo-behaviors.jpg" alt="Qodo — coverage by behavior: happy-path and edge cases marked Covered, gaps offer Generate test, with a prompt-to-change input" />
            </figure>
            <div>
              <div className="eyebrow" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>Human-in-the-loop</div>
              <h2 className="h2 maxw-24" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
                Where the agent <span className="coral serif-it">defers.</span>
              </h2>
              <p className="body maxw-46" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
                Behaviors split into happy-path, edge cases, and other cases — each either <b>Covered</b> or a one-click <b>Generate test</b>. The operator decides what to run, what to keep, and where to prompt a change. The system surfaces the gap; the human makes the call.
              </p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>26</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx**

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '26-qodo-handoff', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Human-in-the-loop</div>
        <h2 className="h2 maxw-24">Where the agent <span className="accent">defers.</span></h2>
        <p className="body body--lg maxw-46">Behaviors split into happy-path, edge cases, and other cases — each either Covered or a one-click Generate test. The operator decides what to run, what to keep, and where to prompt a change. The system surfaces the gap; the human makes the call.</p>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>26 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 26 handoff"`

---

### Task 7: Slide 27 — qodo-outcome (Result)

**Files:** Create `27-qodo-outcome/design.tsx` + `claude.tsx`. Uses `metrics`.

- [ ] **Step 1: design.tsx** (mirrors 19-tessl-outcome/design)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '27-qodo-outcome',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Outcome</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>Adoption at scale. Honest about attribution.</h2>
          <div className="metrics">
            <div className="metric" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="metric__label">Agent installs</div>
              <div className="metric__value"><span className="num">2</span><small>M</small></div>
              <div className="metric__delta">from zero</div>
              <div className="metric__note">300K in the first year, solo designer across every surface.</div>
            </div>
            <div className="metric" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="metric__label">PR reviews run</div>
              <div className="metric__value"><span className="num">4</span><small>M</small></div>
              <div className="metric__delta">in the developer workflow</div>
              <div className="metric__note">Review + PR-agent surfaces embedded in existing flows.</div>
            </div>
            <div className="metric" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="metric__label">Users</div>
              <div className="metric__value"><span className="num">500</span><small>K</small></div>
              <div className="metric__delta">incl. on-prem enterprise</div>
              <div className="metric__note">Design&rsquo;s contribution: agent state + trust surfaces.</div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>27</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (mirrors 19-tessl-outcome/claude; no `num`/`coral` spans)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '27-qodo-outcome', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Outcome</div>
        <h2 className="h2">Adoption at scale. Honest about attribution.</h2>
        <div className="metrics">
          <div className="metric">
            <div className="metric__label">Agent installs</div>
            <div className="metric__value">2<small>M</small></div>
            <div className="metric__delta">from zero</div>
            <div className="metric__note">300K in the first year, solo designer across every surface.</div>
          </div>
          <div className="metric">
            <div className="metric__label">PR reviews run</div>
            <div className="metric__value">4<small>M</small></div>
            <div className="metric__delta">in the developer workflow</div>
            <div className="metric__note">Review + PR-agent surfaces embedded in existing flows.</div>
          </div>
          <div className="metric">
            <div className="metric__label">Users</div>
            <div className="metric__value">500<small>K</small></div>
            <div className="metric__delta">incl. on-prem enterprise</div>
            <div className="metric__note">Design&apos;s contribution: agent state + trust surfaces.</div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>27 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 27 outcome"`

---

### Task 8: Slide 28 — qodo-hindsight (Result/Reflection)

**Files:** Create `28-qodo-hindsight/design.tsx` + `claude.tsx`. design uses `duo`; claude uses `learnings`.

- [ ] **Step 1: design.tsx** (mirrors 20-tessl-hindsight/design; `duo/duo__col/duo__lead/duo__body`)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '28-qodo-hindsight',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>What I&rsquo;d change in hindsight</div>
          <h2 className="h2 maxw-24" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Design the state vocabulary <span className="coral serif-it">once,</span> not per feature.
          </h2>
          <div className="duo">
            <div className="duo__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="duo__lead">What happened.</div>
              <p className="duo__body">Each agent surface invented its own status language as it shipped. Fast, but the meaning of &ldquo;Fixing&rdquo; drifted between surfaces — and every new workflow paid the cost again.</p>
            </div>
            <div className="duo__col" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="duo__lead">What I do now.</div>
              <p className="duo__body">A shared, extensible state model first — <b>one</b> set of states, escalation rules, and handoff moments that new workflow types inherit instead of reinventing.</p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>28</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (mirrors 20-tessl-hindsight/claude; `learnings/learnings__col/lead/body`, `fg` for emphasis)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '28-qodo-hindsight', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">What I&apos;d change in hindsight</div>
        <h2 className="h2">Design the state vocabulary <span className="accent">once</span>, not per feature.</h2>
        <div className="learnings">
          <div className="learnings__col">
            <div className="learnings__lead">What happened.</div>
            <p className="learnings__body">Each agent surface invented its own status language as it shipped. Fast, but the meaning of &ldquo;Fixing&rdquo; drifted between surfaces — and every new workflow paid the cost again.</p>
          </div>
          <div className="learnings__col">
            <div className="learnings__lead">What I do now.</div>
            <p className="learnings__body">A shared, extensible state model <span className="fg">first</span> — one set of states, escalation rules, and handoff moments that new workflow types inherit instead of reinventing.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>28 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 28 hindsight"`

---

### Task 9: Slide 29 — qodo-demo

**Files:** Create `29-qodo-demo/design.tsx` + `claude.tsx`. design uses `DesignDemoFrame` + `flow`; claude uses `DemoFrame`.

- [ ] **Step 1: design.tsx** (mirrors 21-tessl-demo/design)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';
import { DesignDemoFrame } from '@/lib/ui/DesignDemoFrame';

export const meta: SlideMeta = {
  id: '29-qodo-demo',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body" style={{ gap: 'var(--s-6)' }}>
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Live demo</div>
          <div className="flow" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            <span className="flow__chip">Browse</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Test plan</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Agent runs</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Fixing / Failed</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Handoff</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Approve</span>
          </div>
          <DesignDemoFrame label="Switching to the Qodo test agent" sub="Autonomous mode · interrupt anytime" />
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>29</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: claude.tsx** (mirrors 21-tessl-demo/claude; `DemoFrame`)

```tsx
import type { SlideMeta, SlideProps } from '@/lib/types';
import { DemoFrame } from '@/lib/ui/DemoFrame';

export const meta: SlideMeta = { id: '29-qodo-demo', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Live demo</div>
        <h2 className="h2">Browse &rarr; Test plan &rarr; Agent runs &rarr; Fixing / Failed &rarr; Handoff &rarr; Approve</h2>
        <DemoFrame label="Switching to the Qodo test agent" sub="Autonomous mode · interrupt anytime" />
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>29 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
```

NOTE: verify the claude import path for `DemoFrame` matches `21-tessl-demo/claude.tsx` exactly before writing.

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): slide 29 demo"`

---

### Task 10: Rename thank-you 22 → 30

**Files:** `git mv` the folder, bump footer numbers in both variant files.

- [ ] **Step 1: Rename folder**
```bash
git mv src/decks/intro-talk/slides/22-thank-you src/decks/intro-talk/slides/30-thank-you
```

- [ ] **Step 2: Update footer in `30-thank-you/design.tsx`:** change `<b>22</b> / 22` → `<b>30</b> / 30`.
- [ ] **Step 3: Update footer in `30-thank-you/claude.tsx`:** change `22 / 22` → `30 / 30`.
- [ ] **Step 4: Commit** `git commit -m "feat(qodo): move thank-you to slide 30"`

---

### Task 11: Update agenda (Case 03 card)

**Files:** Modify `03-agenda/design.tsx` + `03-agenda/claude.tsx`.

- [ ] **Step 1: design.tsx** — change heading "Two cases. Same lens." → "Three cases. Same lens." and append a third `agenda-card` button after the Tessl card:

```tsx
            <button
              type="button"
              className="agenda-card"
              data-anim
              style={{ ['--d' as string]: 4 } as React.CSSProperties}
              onClick={() => goto?.('22-qodo-title')}
            >
              <div className="agenda-card__idx">Case 03 — Qodo</div>
              <div className="agenda-card__big">03</div>
              <div className="agenda-card__title">AI code generation &amp; the agentic test surface</div>
              <div className="agenda-card__meta"><span>Founding Product Designer</span><span>2022–2025</span></div>
            </button>
```

- [ ] **Step 2: claude.tsx** — apply the equivalent: bump heading to "Three cases", add the Case 03 card matching the existing claude agenda-card markup (read `03-agenda/claude.tsx` first to match its exact structure and `goto` usage).

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): add Case 03 to agenda"`

---

### Task 12: Renumber all existing footers /22 → /30

**Files:** All `src/decks/intro-talk/slides/01..21/**.tsx` (page totals only; the `NN` page index already matches folder order and stays correct).

- [ ] **Step 1: Bump the denominator everywhere**
```bash
cd "/Users/parandykt/CV/Portfolio 2026/Mar2026/v3/deck-swap/src/decks/intro-talk/slides"
# design variant: "</b> / 22<" → "</b> / 30<"
grep -rl '/ 22<' . | xargs sed -i '' 's:/ 22<:/ 30<:g'
# claude variant: ">NN / 22<" → ">NN / 30<"
grep -rl ' / 22<' . | xargs sed -i '' 's: / 22<: / 30<:g'
```

- [ ] **Step 2: Verify no stale `/ 22` totals remain** (qodo + thank-you already use /30)
```bash
grep -rn '/ 22' src/decks/intro-talk/slides || echo "clean"
```
Expected: `clean` (or only matches inside title-meta dates, which there are none — dates use en-dash years, not "/ 22").

- [ ] **Step 3: Commit** `git commit -m "feat(qodo): renumber footers to /30"`

---

### Task 13: Regenerate registry + verify build

- [ ] **Step 1: Regenerate**
```bash
npm run gen
```
Expected: `[gen-registry] wrote .../_generated.ts`

- [ ] **Step 2: Confirm 8 qodo entries + thank-you at 30**
```bash
grep -c "qodo" src/decks/intro-talk/_generated.ts   # expect 16 (8 slides x 2 import lines) + ids
grep "30-thank-you" src/decks/intro-talk/_generated.ts
```

- [ ] **Step 3: Typecheck / build**
```bash
npx tsc --noEmit || npm run build
```
Expected: no errors. If `DemoFrame`/`DesignDemoFrame` import paths differ, fix to match the tessl-demo slides.

- [ ] **Step 4: Lint**
```bash
npm run lint
```
Expected: passes (unescaped-entities handled via `&rsquo;`/`&rdquo;`/`&apos;`).

- [ ] **Step 5: Visual smoke (optional, manual)** — `npm run dev`, walk slides 22–29 in both variants, confirm shots render and agenda Case 03 navigates to `22-qodo-title`.

- [ ] **Step 6: Final commit** `git commit -am "feat(qodo): regenerate registry"` (if gen changed tracked file)

---

## Self-Review

- **Spec coverage:** All 8 slides (22–29) ✓, both variants ✓, two shots on slides 25/26 ✓, agenda Case 03 ✓, footers /30 ✓, thank-you→30 ✓, .shot CSS ✓. Registry auto-gen ✓.
- **Type consistency:** All slides export `meta: SlideMeta` + default `Slide(_: SlideProps)`, matching existing files. `DesignDemoFrame` (design) vs `DemoFrame` (claude) flagged to verify against tessl-demo. Class names verified present in respective CSS (compare/metrics/timeline in both; duo/flow/shot/state-grid/section-* in design only; learnings/DemoFrame in claude only).
- **Placeholders:** none — every step has full code.
