import type { SlideMeta, SlideProps } from '@/lib/types';
import { DemoFrame } from '@/lib/ui/DemoFrame';

export const meta: SlideMeta = { id: '29-qodo-demo', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Live demo</div>
        <h2 className="h2">Browse &rarr; Test plan &rarr; Agent runs &rarr; Fixing / Failed &rarr; Handoff &rarr; Approve</h2>
        <DemoFrame label="Switching to the Qodo test agent" sub="Autonomous mode · interrupt anytime" />
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>29 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
