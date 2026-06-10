import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '10-adlook-outcome',
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
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>Measured against the prior baseline.</h2>
          <div className="metrics">
            <div className="metric" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="metric__label">Deal assembly time</div>
              <div className="metric__value"><span className="num">30</span><small> s</small></div>
              <div className="metric__delta">from ~45 min</div>
              <div className="metric__note">First 12 deals on the new system, weeks 1–4 post-launch. Small sample, clean pattern.</div>
            </div>
            <div className="metric" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="metric__label">Validation errors at submit</div>
              <div className="metric__value"><span className="num">0</span></div>
              <div className="metric__delta">vs. ~5 / week prior</div>
              <div className="metric__note">First 90 days, from the ops lead&rsquo;s manual log. The rate vs. baseline is what matters.</div>
            </div>
            <div className="metric" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="metric__label">Operator satisfaction</div>
              <div className="metric__value"><span className="num">9.3</span><small> / 10</small></div>
              <div className="metric__delta">internal survey, +30 days</div>
              <div className="metric__note">N=8, the entire deal team — the right denominator for who it&rsquo;s built for.</div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>10</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
