import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '09-adlook-ds', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The design system</div>
        <h2 className="h2">Extracted from production, <span className="accent">continuous design integration.</span></h2>
        <div className="ds-grid">
          <div className="ds-tile">
            <div className="ds-tile__label">Color tokens</div>
            <div className="ds-tile__visual">
              <div className="ds-swatch" style={{ background: 'oklch(0.16 0.006 250)', border: '1px solid var(--line)' }} />
              <div className="ds-swatch" style={{ background: 'oklch(0.30 0.006 250)' }} />
              <div className="ds-swatch" style={{ background: 'var(--accent-dim)' }} />
              <div className="ds-swatch" style={{ background: 'var(--accent)' }} />
              <div className="ds-swatch" style={{ background: 'var(--accent-bright)' }} />
            </div>
          </div>
          <div className="ds-tile">
            <div className="ds-tile__label">Typography</div>
            <div className="ds-type-scale">
              <div className="ds-type-row" style={{ ['--w' as string]: '100%', ['--h' as string]: '22px' } as React.CSSProperties} />
              <div className="ds-type-row" style={{ ['--w' as string]: '79%', ['--h' as string]: '17px' } as React.CSSProperties} />
              <div className="ds-type-row" style={{ ['--w' as string]: '62%', ['--h' as string]: '14px' } as React.CSSProperties} />
              <div className="ds-type-row" style={{ ['--w' as string]: '49%', ['--h' as string]: '11px' } as React.CSSProperties} />
              <div className="ds-type-row" style={{ ['--w' as string]: '38%', ['--h' as string]: '8px' } as React.CSSProperties} />
              <div className="ds-type-row" style={{ ['--w' as string]: '30%', ['--h' as string]: '7px' } as React.CSSProperties} />
              <div className="ds-type-row" style={{ ['--w' as string]: '24%', ['--h' as string]: '5px' } as React.CSSProperties} />
            </div>
          </div>
          <div className="ds-tile">
            <div className="ds-tile__label">Components</div>
            <div className="ds-tile__visual ds-tile__visual--compact">
              <div className="ds-tile__row"><span className="ds-pill ds-pill--solid">Approve</span><span className="ds-pill">Cancel</span></div>
              <div className="ds-tile__row"><span className="ds-pill">Secondary</span></div>
              <div className="ds-tile__row"><span className="ds-pill ds-pill--disabled">Disabled</span></div>
            </div>
          </div>
          <div className="ds-tile">
            <div className="ds-tile__label">Validation states</div>
            <div className="ds-tile__visual ds-validation">
              <div className="mock-card mock-card--compact">
                <div><div className="mock-card__title" style={{ width: '60%' }} /></div>
                <div className="mock-card__state">verified</div>
              </div>
              <div className="mock-card mock-card--warn mock-card--compact">
                <div><div className="mock-card__title" style={{ width: '55%' }} /></div>
                <div className="mock-card__state">review</div>
              </div>
              <div className="mock-card mock-card--warn mock-card--compact">
                <div><div className="mock-card__title" style={{ width: '48%' }} /></div>
                <div className="mock-card__state">review</div>
              </div>
            </div>
          </div>
        </div>
        <p className="body mt-7 maxw-64"><span className="fg">CDI (Continuous Design Integration): Code &harr; Storybook &harr; Figma.</span></p>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>09 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
