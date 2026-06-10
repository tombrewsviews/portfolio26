import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '19-tessl-outcome',
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
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>Honest about attribution.</h2>
          <div className="metrics">
            <div className="metric" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="metric__label">Skill install try-rate</div>
              <div className="metric__value">~<span className="num">70</span><small>%</small></div>
              <div className="metric__delta">from ~18% (post CLI pivot)</div>
              <div className="metric__note">Closed-beta cohort, N=23 developers.</div>
            </div>
            <div className="metric" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="metric__label">Hypothesis cycles to PMF</div>
              <div className="metric__value"><span className="num">5</span></div>
              <div className="metric__delta">over 12 months</div>
              <div className="metric__note">Each driven by a direct customer signal.</div>
            </div>
            <div className="metric" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="metric__label">Active enterprise pipeline</div>
              <div className="metric__value"><span className="num">21</span></div>
              <div className="metric__delta">deals at handoff</div>
              <div className="metric__note">Design&rsquo;s contribution: trust + admin surfaces.</div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>19</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
