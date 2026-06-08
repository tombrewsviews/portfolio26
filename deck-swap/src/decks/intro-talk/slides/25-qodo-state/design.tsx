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
