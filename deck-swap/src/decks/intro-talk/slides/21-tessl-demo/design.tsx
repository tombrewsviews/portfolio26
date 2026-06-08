import type { SlideMeta, SlideProps } from '@/lib/types';
import { DesignDemoFrame } from '@/lib/ui/DesignDemoFrame';

export const meta: SlideMeta = {
  id: '21-tessl-demo',
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
            <span className="flow__chip">Browse</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Skill detail</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Install</span><span className="flow__arrow">→</span>
            <span className="flow__chip">CLI side-by-side</span>
          </div>
          <DesignDemoFrame label="Switching to registry.tessl.io" sub="Web + terminal · interrupt anytime" />
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>21</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
