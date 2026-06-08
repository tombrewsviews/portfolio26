import type { SlideMeta, SlideProps } from '@/lib/types';
import { DesignDemoFrame } from '@/lib/ui/DesignDemoFrame';

export const meta: SlideMeta = {
  id: '12-adlook-demo',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body" style={{ gap: 'var(--s-6)' }}>
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Live demo</div>
          <div className="flow" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            <span className="flow__chip">Create</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Assemble</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Validate</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Approve</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Track</span>
          </div>
          <DesignDemoFrame label="Switching to live system" sub="Anonymized data · interrupt anytime" />
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>12</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
