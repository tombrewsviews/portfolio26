import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '22-qodo-title',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.255 0.020 48)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--ink">
      <div className="slide-inner">
        <div className="section-index" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>03</div>
        <div className="slide-body">
          <div className="section-num" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Case 03</div>
          <h1 className="section-title" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Qodo.<span className="sub">AI code generation in the developer&rsquo;s terminal.</span>
          </h1>
          <div className="section-meta" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>Founding Product Designer / Design Engineer · 2022–2025</div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>22</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
