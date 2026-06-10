import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '06-adlook-problem', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="problem-type">
          <div className="eyebrow">The problem</div>
          <h2 className="problem-type__head">
            <span className="problem-type__line">Deal data lived across <span className="accent">5+ surfaces.</span></span>
            <span className="problem-type__line">Every deal involved manual reconciliation.</span>
          </h2>
          <div className="problem-type__surfaces" aria-label="Surfaces involved in one deal">
            <span>Partner email</span>
            <span>Pricing sheet</span>
            <span>CRM</span>
            <span>Slack approval</span>
            <span>Dashboard</span>
          </div>
          <div className="problem-type__body">
            <p>Errors landed at the <span className="fg">paste-boundaries between tools</span> — not inside any one tool.</p>
            <p>Operators didn&apos;t trust the system to flag what was wrong, so they double-checked everything by hand.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>06 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
