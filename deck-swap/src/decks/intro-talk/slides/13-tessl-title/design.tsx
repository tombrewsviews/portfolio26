import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '13-tessl-title',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.255 0.020 48)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--ink">
      <div className="slide-inner">
        <div className="section-index" data-anim="fade" style={{ ['--d' as string]: 0 } as React.CSSProperties}>02</div>
        <div className="slide-body">
          <div className="section-num" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Case 02</div>
          <h1 className="section-title" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Tessl.<span className="sub">Package manager for AI skills.</span>
          </h1>
          <div className="section-meta" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>Founding Product Designer / Design Engineer · 2025–26</div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>13</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
