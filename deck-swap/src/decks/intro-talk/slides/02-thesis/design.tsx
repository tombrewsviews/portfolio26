import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '02-thesis',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Thesis</div>
          <h1 className="thesis-statement" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            I design for technical users working with <span className="mark coral">dense, high-stakes data.</span>
          </h1>
          <div className="logo-row" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
            <span className="logo-row__label">In practice —</span>
            <span className="logo-row__item logo-row__item--adlook"><img src="/deck-design/logos/adlook.svg" alt="Adlook" /></span>
            <span className="logo-row__item logo-row__item--tessl"><img src="/deck-design/logos/tessl.svg" alt="Tessl" /></span>
            <span className="logo-row__item logo-row__item--neon"><img src="/deck-design/logos/neon.svg" alt="Neon" /></span>
            <span className="logo-row__item logo-row__item--qodo"><img src="/deck-design/logos/qodo.svg" alt="Qodo" /></span>
          </div>
        </div>
        <footer className="foot">
          <span>Portfolio — Guidepoint</span>
          <span className="foot__pg"><b>02</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
