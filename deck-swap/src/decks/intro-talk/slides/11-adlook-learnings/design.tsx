import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '11-adlook-learnings',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>What worked — and why</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Build the logic first. <span className="coral serif-it">Earn the polish.</span>
          </h2>
          <div className="duo">
            <div className="duo__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="duo__lead">MVP first, iterate with stakeholders.</div>
              <p className="duo__body">Surfaced the real <b>system logic and edge cases</b> early — before committing to any UI direction. Cheap to be wrong about.</p>
            </div>
            <div className="duo__col" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="duo__lead">Polish at the end.</div>
              <p className="duo__body">The team had already seen the system function. Craft then read as <b>investment, not delay</b> — they saw we had time to care, because the work was already trusted.</p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>11</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
