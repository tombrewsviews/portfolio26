import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '19-tessl-outcome', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Outcome</div>
        <h2 className="h2">Honest about attribution.</h2>
        <div className="metrics">
          <div className="metric">
            <div className="metric__label">Skill install try-rate</div>
            <div className="metric__value">~70<small>%</small></div>
            <div className="metric__delta">from ~18% (post CLI pivot)</div>
            <div className="metric__note">Closed-beta cohort, N=23 developers.</div>
          </div>
          <div className="metric">
            <div className="metric__label">Hypothesis cycles to PMF</div>
            <div className="metric__value">5</div>
            <div className="metric__delta">over 12 months</div>
            <div className="metric__note">Each driven by a direct customer signal.</div>
          </div>
          <div className="metric">
            <div className="metric__label">Active enterprise pipeline</div>
            <div className="metric__value">21</div>
            <div className="metric__delta">deals at handoff</div>
            <div className="metric__note">Design&apos;s contribution: trust + admin surfaces.</div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>19 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
