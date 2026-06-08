import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-title', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--title is-active">
      <div className="slide__body">
        <div className="title-block">
          <div className="title-name">Tom Parandyk</div>
          <div className="title-role">Product Design Engineer</div>
          <div className="title-date">May 2026</div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Portfolio Presentation for Guidepoint</span>
        <span>01 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
