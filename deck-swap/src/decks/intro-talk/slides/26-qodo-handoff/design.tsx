import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '26-qodo-handoff',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="state-grid">
            <figure className="shot" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>
              <img src="/deck-design/shots/qodo-behaviors.jpg" alt="Qodo — coverage by behavior: happy-path and edge cases marked Covered, gaps offer Generate test, with a prompt-to-change input" />
            </figure>
            <div>
              <div className="eyebrow" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>Human-in-the-loop</div>
              <h2 className="h2 maxw-24" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
                Where the agent <span className="coral serif-it">defers.</span>
              </h2>
              <p className="body maxw-46" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
                Behaviors split into happy-path, edge cases, and other cases — each either <b>Covered</b> or a one-click <b>Generate test</b>. The operator decides what to run, what to keep, and where to prompt a change. The system surfaces the gap; the human makes the call.
              </p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>26</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
