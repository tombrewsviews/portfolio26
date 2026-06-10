import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '08-adlook-decision',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The design decision</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Density vs. trust — and the iteration that <span className="coral serif-it">resolved it.</span>
          </h2>
          <div className="versions">
            <div className="version" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="version__label">
                <span className="version__name">Dense table</span>
                <span className="version__tag">V1</span>
              </div>
              <div className="version__visual">
                <div className="mock-table">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`h${i}`} className="mt-cell mt-cell--head" />
                  ))}
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div key={i} className="mt-cell" />
                  ))}
                </div>
              </div>
              <p className="version__caption">Every field visible. Power-user optimized. Operators didn&rsquo;t trust it — kept switching to detail view to verify by hand.</p>
            </div>
            <div className="version version--win" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="version__label">
                <span className="version__name">Card + disclosure</span>
                <span className="version__tag">V3 · shipped</span>
              </div>
              <div className="version__visual">
                <div className="mock-cards">
                  <div className="mc"><div><div className="mc__bar" style={{ width: '60%' }} /><div className="mc__sub" style={{ width: '40%' }} /></div><div className="mc__state">verified</div></div>
                  <div className="mc mc--warn"><div><div className="mc__bar" style={{ width: '55%' }} /><div className="mc__sub" style={{ width: '35%' }} /></div><div className="mc__state">review</div></div>
                  <div className="mc"><div><div className="mc__bar" style={{ width: '65%' }} /><div className="mc__sub" style={{ width: '45%' }} /></div><div className="mc__state">verified</div></div>
                  <div className="mc mc--warn"><div><div className="mc__bar" style={{ width: '50%' }} /><div className="mc__sub" style={{ width: '30%' }} /></div><div className="mc__state">review</div></div>
                </div>
              </div>
              <p className="version__caption">Validation state lives in the <b>card border</b>, not on each field. Scan 30 deals, see what needs attention. &ldquo;Done&rdquo; = trust signal, not feature set.</p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>08</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
