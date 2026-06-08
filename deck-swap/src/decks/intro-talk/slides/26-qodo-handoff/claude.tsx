import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '26-qodo-handoff', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Human-in-the-loop</div>
        <h2 className="h2 maxw-24">Where the agent <span className="accent">defers.</span></h2>
        <p className="body body--lg maxw-46">Behaviors split into happy-path, edge cases, and other cases — each either Covered or a one-click Generate test. The operator decides what to run, what to keep, and where to prompt a change. The system surfaces the gap; the human makes the call.</p>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>26 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
