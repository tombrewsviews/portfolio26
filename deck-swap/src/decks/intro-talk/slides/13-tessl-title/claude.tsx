import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '13-tessl-title',
  variant: 'claude',
  transition: 'fade',
  bg: 'linear-gradient(180deg, oklch(0.22 0.04 190), oklch(0.16 0.02 190))',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--section is-active">
      <div className="slide__body">
        <div className="eyebrow">Case 02</div>
        <h1 className="display">Tessl.<br /><span className="muted">Package manager for AI skills.</span></h1>
        <div className="body body--lg mt-7 maxw-52">Founding Product Designer / Design Engineer · 2025–26</div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>13 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
