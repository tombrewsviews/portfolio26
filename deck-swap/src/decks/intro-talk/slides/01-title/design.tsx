import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '01-title',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.255 0.020 48)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--ink">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="title-block">
            <div className="title-kicker" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Portfolio presentation · Guidepoint</div>
            <div className="title-name" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>Tom Parandyk</div>
            <div className="title-rule" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties} />
            <div className="title-meta" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <span className="title-role">Product Design Engineer</span>
              <span className="title-date">May 2026</span>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Portfolio — Guidepoint</span>
          <span className="foot__pg"><b>01</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
