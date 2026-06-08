import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '15-tessl-speed', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">My role &amp; the speed problem</div>
        <h2 className="h2">Hired to speed up delivery. <span className="accent">Reframed it as speeding up learning.</span></h2>
        <div className="timeline">
          <div className="timeline__step">
            <div className="timeline__when">Month 0</div>
            <div className="timeline__what">Hired. Weeks-per-surface cycle. Figma-first.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Month 1</div>
            <div className="timeline__what">Code prototyping with closed customer group. Stopped Figma first past low-fi.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Months 2–11</div>
            <div className="timeline__what">5 hypothesis revisions. Each a deliberate disconfirming test.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Month 12</div>
            <div className="timeline__what">PMF candidate ships. Enterprise pipeline opens.</div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>15 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
