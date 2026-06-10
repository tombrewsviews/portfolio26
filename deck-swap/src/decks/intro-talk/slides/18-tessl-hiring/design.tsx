import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '18-tessl-hiring',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Building the team</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Hired the design team that&rsquo;s <span className="coral serif-it">running it now.</span>
          </h2>
          <div className="paths">
            <div className="path" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="path__label">ATeam</div>
              <div className="path__title">Hiring at scale</div>
              <p className="path__detail">Interviewed and hired <b>hundreds of designers</b> for Fortune 500 projects — the calibration good hiring requires.</p>
            </div>
            <div className="path path--win" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="path__label">Tessl</div>
              <div className="path__title">Hired the design team</div>
              <p className="path__detail"><b>Hamza</b> — Product Design · hired 2026.<br /><b>Sandra</b> — UXR, Product Design · hired 2026.</p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>18</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
