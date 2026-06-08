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
