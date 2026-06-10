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
