import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '20-tessl-hindsight',
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
            Run the disconfirming study <span className="coral serif-it">before</span> the sprint, not after.
          </h2>
          <div className="duo">
            <div className="duo__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="duo__lead">What happened.</div>
              <p className="duo__body">Ran the CLI session study six weeks too late. The data was sitting there earlier; momentum on the existing UI carried us past it.</p>
            </div>
            <div className="duo__col" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="duo__lead">What I do now.</div>
              <p className="duo__body">A disconfirming user study sits <b>before</b> every major sprint — not after. Doesn&rsquo;t eliminate the trap, but it shortens the lag.</p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>20</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
