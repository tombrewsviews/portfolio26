import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '17-tessl-verdict',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="verdict-grid">
            <div className="verdict-text">
              <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Making quality legible</div>
              <h2 className="h2 maxw-22" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
                Trust before install. The detail view is a <span className="coral serif-it">verdict, not a spec sheet.</span>
              </h2>
              <p className="body maxw-46" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
                Three signals — quality, impact, security. The naive design: show all three, let the user reason. Underlying data is one click away for those who want it.
              </p>
            </div>
            <div className="verdict-mock" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="vm-head">
                <div className="vm-pkg">tessl-labs/react-patterns <small>skill</small></div>
                <div className="vm-ver">v 0.2.0</div>
              </div>
              <div className="vm-banner">
                <div className="vm-dot" />
                <div className="vm-banner__label">Safe to install.</div>
                <div className="vm-banner__action">Install →</div>
              </div>
              <div className="vm-scores">
                <div className="vm-score">
                  <div className="vm-score__label">Quality</div>
                  <div className="vm-score__value vm-score__value--warn"><span className="num">63</span><small>%</small></div>
                  <div className="vm-bar"><span className="warn" style={{ width: '63%' }} /></div>
                  <div className="vm-score__hint">Follows best practices?</div>
                </div>
                <div className="vm-score">
                  <div className="vm-score__label">Impact</div>
                  <div className="vm-score__value"><span className="num">93</span><small>%</small></div>
                  <div className="vm-bar"><span style={{ width: '93%' }} /></div>
                  <div className="vm-score__hint">Avg. across 17 evals</div>
                </div>
                <div className="vm-score">
                  <div className="vm-score__label">Security</div>
                  <div className="vm-score__value vm-score__value--ok">Passed</div>
                  <div className="vm-bar vm-bar--seg">
                    <span style={{ flex: 1 }} /><span style={{ flex: 1 }} /><span style={{ flex: 1 }} /><span style={{ flex: 1 }} />
                  </div>
                  <div className="vm-score__hint">No known issues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>17</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
