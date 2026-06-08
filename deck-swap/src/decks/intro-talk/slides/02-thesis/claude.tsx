import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-thesis', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Thesis</div>
        <div className="logo-strip">
          <div className="logo-chip logo-chip--img"><img src="/deck/logos/adlook.svg" alt="Adlook" /></div>
          <div className="logo-chip logo-chip--img"><img src="/deck/logos/tessl.svg" alt="Tessl" className="logo--sm" /></div>
          <div className="logo-chip logo-chip--img"><img src="/deck/logos/neon.svg" alt="Neon" className="logo--xs" /></div>
          <div className="logo-chip logo-chip--img"><img src="/deck/logos/qodo.svg" alt="Qodo" className="logo--sm" /></div>
        </div>
        <h1 className="h2">I design for technical users working with <span className="accent">dense, high-stakes data.</span></h1>
      </div>
      <footer className="slide__footer">
        <span>Portfolio Presentation for Guidepoint</span>
        <span>02 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
