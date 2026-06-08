import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '10-adlook-outcome', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Outcome</div>
        <h2 className="h2">Measured against the prior baseline.</h2>
        <div className="metrics">
          <div className="metric">
            <div className="metric__label">Deal assembly time</div>
            <div className="metric__value">30<small> s</small></div>
            <div className="metric__delta">from ~45 min</div>
            <div className="metric__note">Measured across the first 12 deals run on the new system, weeks 1–4 post-launch. Small sample, clean pattern.</div>
          </div>
          <div className="metric">
            <div className="metric__label">Validation errors at submit</div>
            <div className="metric__value">0</div>
            <div className="metric__delta">vs. ~5 / week prior</div>
            <div className="metric__note">First 90 days, tracked from the ops lead&apos;s manual log. Will be non-zero eventually — the rate vs. baseline is what matters.</div>
          </div>
          <div className="metric">
            <div className="metric__label">Operator satisfaction</div>
            <div className="metric__value">9.3<small> / 10</small></div>
            <div className="metric__delta">internal survey, +30 days</div>
            <div className="metric__note">N=8, the entire deal team. Right denominator for who the system is built for — not a broader population study.</div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>10 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
