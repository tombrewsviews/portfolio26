import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '18-tessl-hiring', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Building the team</div>
        <h2 className="h2">Hired the design team that&apos;s running it now.</h2>
        <div className="paths">
          <div className="path">
            <div className="path__label">ATeam</div>
            <div className="path__title">Hiring at scale</div>
            <p className="path__detail">Interviewed and hired <span className="fg">hundreds of designers</span> for Fortune 500 projects — the calibration good hiring requires.</p>
          </div>
          <div className="path path--win">
            <div className="path__label">Tessl</div>
            <div className="path__title">Hired the design team</div>
            <p className="path__detail"><span className="fg">Hamza</span> — Product Design · hired 2026.<br /><span className="fg">Sandra</span> — UXR, Product Design · hired 2026.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>18 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
