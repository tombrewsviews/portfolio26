import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '09-adlook-ds',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The design system</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Extracted from production, <span className="coral serif-it">continuously integrated.</span>
          </h2>
          <div className="ds-grid">
            <div className="ds-tile" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="ds-tile__label">Color tokens</div>
              <div className="ds-vis">
                <div className="ds-swatch" style={{ background: 'var(--ink-bg)' }} />
                <div className="ds-swatch" style={{ background: 'var(--line-strong)' }} />
                <div className="ds-swatch" style={{ background: 'var(--clay-deep)' }} />
                <div className="ds-swatch" style={{ background: 'var(--clay)' }} />
                <div className="ds-swatch" style={{ background: 'var(--clay-bright)' }} />
              </div>
            </div>
            <div className="ds-tile" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="ds-tile__label">Typography</div>
              <div className="ds-type-scale">
                {[
                  { w: '100%', h: '22px' },
                  { w: '79%', h: '17px' },
                  { w: '62%', h: '14px' },
                  { w: '49%', h: '11px' },
                  { w: '38%', h: '9px' },
                  { w: '30%', h: '7px' },
                ].map((row, i) => (
                  <div key={i} className="ds-type-row" style={{ ['--w' as string]: row.w, ['--h' as string]: row.h } as React.CSSProperties} />
                ))}
              </div>
            </div>
            <div className="ds-tile" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="ds-tile__label">Components</div>
              <div className="ds-vis" style={{ gap: 'var(--s-3)' }}>
                <div className="ds-row"><span className="ds-pill ds-pill--solid">Approve</span><span className="ds-pill">Cancel</span></div>
                <div className="ds-row"><span className="ds-pill">Secondary</span></div>
                <div className="ds-row"><span className="ds-pill ds-pill--ghost">Disabled</span></div>
              </div>
            </div>
            <div className="ds-tile" data-anim style={{ ['--d' as string]: 5 } as React.CSSProperties}>
              <div className="ds-tile__label">Validation states</div>
              <div className="ds-vis" style={{ gap: 'var(--s-3)' }}>
                <div className="mc"><div><div className="mc__bar" style={{ width: '60%' }} /></div><div className="mc__state">verified</div></div>
                <div className="mc mc--warn"><div><div className="mc__bar" style={{ width: '55%' }} /></div><div className="mc__state">review</div></div>
                <div className="mc mc--warn"><div><div className="mc__bar" style={{ width: '48%' }} /></div><div className="mc__state">review</div></div>
              </div>
            </div>
          </div>
          <p className="ds-cdi" data-anim style={{ ['--d' as string]: 6 } as React.CSSProperties}>
            <b>CDI</b> — Continuous Design Integration: Code ↔ Storybook ↔ Figma.
          </p>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>09</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
