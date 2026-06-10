import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '15-tessl-speed',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>My role &amp; the speed problem</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Hired to speed up delivery. <span className="coral serif-it">Reframed it as speeding up learning.</span>
          </h2>
          <div className="timeline">
            <div className="tl-step" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="tl-when">Month 0</div>
              <div className="tl-what">Hired. Weeks-per-surface cycle. Figma-first.</div>
            </div>
            <div className="tl-step" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="tl-when">Month 1</div>
              <div className="tl-what">Code prototyping with a closed customer group. Stopped Figma-first past low-fi.</div>
            </div>
            <div className="tl-step" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="tl-when">Months 2–11</div>
              <div className="tl-what">5 hypothesis revisions. Each a deliberate disconfirming test.</div>
            </div>
            <div className="tl-step tl-step--end" data-anim style={{ ['--d' as string]: 5 } as React.CSSProperties}>
              <div className="tl-when">Month 12</div>
              <div className="tl-what">PMF candidate ships. Enterprise pipeline opens.</div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>15</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
