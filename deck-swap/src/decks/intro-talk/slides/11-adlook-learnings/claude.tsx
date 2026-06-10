import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '11-adlook-learnings', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">What worked — and why</div>
        <h2 className="h2">Build the logic first. <span className="accent">Earn the polish.</span></h2>
        <div className="learnings">
          <div className="learnings__col">
            <div className="learnings__lead">MVP first, iterate with stakeholders.</div>
            <p className="learnings__body">Surfaced the real <span className="fg">system logic and edge cases</span> early — before committing to any UI direction. Cheap to be wrong about.</p>
          </div>
          <div className="learnings__col">
            <div className="learnings__lead">Polish at the end.</div>
            <p className="learnings__body">The team had already seen the system function. Craft then read as <span className="fg">investment, not delay</span> — they saw we had time to care, because the work was already trusted.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>11 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
