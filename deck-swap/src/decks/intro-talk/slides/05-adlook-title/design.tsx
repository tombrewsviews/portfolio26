import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '05-adlook-title',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.255 0.020 48)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--ink">
      <div className="slide-inner">
        <div className="section-index" data-anim="fade" style={{ ['--d' as string]: 0 } as React.CSSProperties}>01</div>
        <div className="slide-body">
          <div className="section-num" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Case 01</div>
          <h1 className="section-title" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Adlook.<span className="sub">Internal deal platform.</span>
          </h1>
          <div className="section-meta" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>Solo Product Operator · 2026 · Under NDA</div>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>05</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
