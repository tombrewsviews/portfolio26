import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '08-adlook-decision', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The design decision</div>
        <h2 className="h2">Density vs. trust — and the iteration that resolved it.</h2>
        <div className="versions">
          <div className="version">
            <div className="version__label"><span>V1</span><strong>Dense table</strong></div>
            <div className="version__visual">
              <div className="mock-table">
                <div className="mock-table__cell mock-table__cell--head" />
                <div className="mock-table__cell mock-table__cell--head" />
                <div className="mock-table__cell mock-table__cell--head" />
                <div className="mock-table__cell mock-table__cell--head" />
                <div className="mock-table__cell mock-table__cell--head" />
                <div className="mock-table__cell mock-table__cell--head" />
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="mock-table__cell" />
                ))}
              </div>
            </div>
            <p className="version__caption">Every field visible. Power-user optimized. Operators didn&apos;t trust it — kept switching to detail view to verify by hand.</p>
          </div>
          <div className="version version--win">
            <div className="version__label"><span>V3 (shipped)</span><strong>Card + disclosure</strong></div>
            <div className="version__visual">
              <div className="mock-cards">
                <div className="mock-card">
                  <div>
                    <div className="mock-card__title" />
                    <div className="mock-card__sub" />
                  </div>
                  <div className="mock-card__state">verified</div>
                </div>
                <div className="mock-card mock-card--warn">
                  <div>
                    <div className="mock-card__title" style={{ width: '55%' }} />
                    <div className="mock-card__sub" style={{ width: '35%' }} />
                  </div>
                  <div className="mock-card__state">review</div>
                </div>
                <div className="mock-card">
                  <div>
                    <div className="mock-card__title" style={{ width: '65%' }} />
                    <div className="mock-card__sub" style={{ width: '45%' }} />
                  </div>
                  <div className="mock-card__state">verified</div>
                </div>
                <div className="mock-card mock-card--warn">
                  <div>
                    <div className="mock-card__title" style={{ width: '50%' }} />
                    <div className="mock-card__sub" style={{ width: '30%' }} />
                  </div>
                  <div className="mock-card__state">review</div>
                </div>
                <div className="mock-card">
                  <div>
                    <div className="mock-card__title" style={{ width: '58%' }} />
                    <div className="mock-card__sub" style={{ width: '40%' }} />
                  </div>
                  <div className="mock-card__state">verified</div>
                </div>
              </div>
            </div>
            <p className="version__caption">Validation state lives in the card border, not on each field. Scan 30 deals, see what needs attention. &ldquo;Done&rdquo; = trust signal, not feature set.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>08 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
