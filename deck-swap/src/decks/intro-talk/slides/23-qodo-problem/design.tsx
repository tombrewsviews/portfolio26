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
