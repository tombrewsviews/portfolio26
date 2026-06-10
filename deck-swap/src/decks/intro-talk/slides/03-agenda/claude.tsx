import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-agenda', variant: 'claude', transition: 'fade' };

export default function Slide({ goto }: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Agenda</div>
        <h2 className="h2">Three cases. Same lens.</h2>
        <div className="agenda">
          <button
            type="button"
            className="agenda-card"
            data-goto="05-adlook-title"
            onClick={() => goto?.('05-adlook-title')}
          >
            <div className="agenda-card__num">Case 01 — Adlook</div>
            <div className="agenda-card__title">Internal deal management platform</div>
            <div className="agenda-card__meta">
              <span>Solo Product Operator</span>
              <span>2026</span>
            </div>
          </button>
          <button
            type="button"
            className="agenda-card"
            data-goto="13-tessl-title"
            onClick={() => goto?.('13-tessl-title')}
          >
            <div className="agenda-card__num">Case 02 — Tessl</div>
            <div className="agenda-card__title">Package manager for AI skills</div>
            <div className="agenda-card__meta">
              <span>Founding Product Designer</span>
              <span>2025–26</span>
            </div>
          </button>
          <button
            type="button"
            className="agenda-card"
            data-goto="22-qodo-title"
            onClick={() => goto?.('22-qodo-title')}
          >
            <div className="agenda-card__num">Case 03 — Qodo</div>
            <div className="agenda-card__title">AI code generation &amp; the agentic test surface</div>
            <div className="agenda-card__meta">
              <span>Founding Product Designer</span>
              <span>2022–2025</span>
            </div>
          </button>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Portfolio Presentation for Guidepoint</span>
        <span>03 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
