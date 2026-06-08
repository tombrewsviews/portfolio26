import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '06-adlook-problem',
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
          <div className="problem-grid">
            <div className="problem-copy">
              <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
                Deal data lived across <span className="coral">5+ surfaces.</span> Every deal meant manual reconciliation.
              </h2>
              <p className="body" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
                Errors landed at the <b>paste-boundaries between tools</b> — not inside any one tool. Operators didn&rsquo;t trust the system to flag what was wrong, so they double-checked everything by hand.
              </p>
            </div>
            <div className="surfaces" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="surface"><span className="surface__n">01</span><span>Partner email</span><span className="surface__tag">inbound</span></div>
              <div className="surface"><span className="surface__n">02</span><span>Pricing sheet</span><span className="surface__tag">excel</span></div>
              <div className="surface"><span className="surface__n">03</span><span>CRM</span><span className="surface__tag">salesforce</span></div>
              <div className="surface surface--seam"><span className="surface__n">→</span><span>Paste-boundary</span><span className="surface__tag">errors live here</span></div>
              <div className="surface"><span className="surface__n">04</span><span>Slack approval</span><span className="surface__tag">thread</span></div>
              <div className="surface"><span className="surface__n">05</span><span>Dashboard</span><span className="surface__tag">reporting</span></div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>06</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
