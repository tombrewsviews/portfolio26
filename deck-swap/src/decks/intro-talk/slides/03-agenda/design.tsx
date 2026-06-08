import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '03-agenda',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide({ goto }: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Agenda</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Three cases. <span className="serif-it coral">Same lens.</span>
          </h2>
          <div className="agenda">
            <button
              type="button"
              className="agenda-card"
              data-anim
              style={{ ['--d' as string]: 2 } as React.CSSProperties}
              onClick={() => goto?.('05-adlook-title')}
            >
              <div className="agenda-card__idx">Case 01 — Adlook</div>
              <div className="agenda-card__big">01</div>
              <div className="agenda-card__title">Internal deal management platform</div>
              <div className="agenda-card__meta"><span>Solo Product Operator</span><span>2026</span></div>
            </button>
            <button
              type="button"
              className="agenda-card"
              data-anim
              style={{ ['--d' as string]: 3 } as React.CSSProperties}
              onClick={() => goto?.('13-tessl-title')}
            >
              <div className="agenda-card__idx">Case 02 — Tessl</div>
              <div className="agenda-card__big">02</div>
              <div className="agenda-card__title">Package manager for AI skills</div>
              <div className="agenda-card__meta"><span>Founding Product Designer</span><span>2025–26</span></div>
            </button>
            <button
              type="button"
              className="agenda-card"
              data-anim
              style={{ ['--d' as string]: 4 } as React.CSSProperties}
              onClick={() => goto?.('22-qodo-title')}
            >
              <div className="agenda-card__idx">Case 03 — Qodo</div>
              <div className="agenda-card__big">03</div>
              <div className="agenda-card__title">AI code generation &amp; the agentic test surface</div>
              <div className="agenda-card__meta"><span>Founding Product Designer</span><span>2022–2025</span></div>
            </button>
          </div>
        </div>
        <footer className="foot">
          <span>Portfolio — Guidepoint</span>
          <span className="foot__pg"><b>03</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
