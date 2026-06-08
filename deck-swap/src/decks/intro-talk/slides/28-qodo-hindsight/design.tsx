import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '28-qodo-hindsight',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>What I&rsquo;d change in hindsight</div>
          <h2 className="h2 maxw-24" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Design the state vocabulary <span className="coral serif-it">once,</span> not per feature.
          </h2>
          <div className="duo">
            <div className="duo__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="duo__lead">What happened.</div>
              <p className="duo__body">Each agent surface invented its own status language as it shipped. Fast, but the meaning of &ldquo;Fixing&rdquo; drifted between surfaces — and every new workflow paid the cost again.</p>
            </div>
            <div className="duo__col" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="duo__lead">What I do now.</div>
              <p className="duo__body">A shared, extensible state model first — <b>one</b> set of states, escalation rules, and handoff moments that new workflow types inherit instead of reinventing.</p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>28</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
