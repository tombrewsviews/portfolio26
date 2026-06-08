import type { SlideMeta, SlideProps } from '@/lib/types';
import { DesignDemoFrame } from '@/lib/ui/DesignDemoFrame';

export const meta: SlideMeta = {
  id: '29-qodo-demo',
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
            <span className="flow__chip">Test plan</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Agent runs</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Fixing / Failed</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Handoff</span><span className="flow__arrow">→</span>
            <span className="flow__chip">Approve</span>
          </div>
          <DesignDemoFrame label="Switching to the Qodo test agent" sub="Autonomous mode · interrupt anytime" />
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>29</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
