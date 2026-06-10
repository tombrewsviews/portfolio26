import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '17-tessl-verdict', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--verdict is-active">
      <div className="slide__body">
        <div className="cols-2 cols-2--text-wide">
          <div className="cols-text">
            <div className="eyebrow">Making quality legible</div>
            <h2 className="h2 maxw-22">Trust before install. <span className="accent">The detail view is a verdict, not a spec sheet.</span></h2>
            <p className="body maxw-46">Three signals — quality, impact, security. Naive design: show all three, let the user reason. Underlying data is one click away for those who want it.</p>
          </div>
          <div className="verdict-mock">
            <div className="verdict-head">
              <div className="verdict-pkg">tessl-labs/react-patterns <small>skill</small></div>
              <div className="verdict-version">v 0.2.0</div>
            </div>
            <div className="verdict-banner">
              <div className="verdict-banner__dot" />
              <div className="verdict-banner__label">Safe to install.</div>
              <div className="verdict-banner__action">Install →</div>
            </div>
            <div className="verdict-scores">
              <div className="verdict-score">
                <div className="verdict-score__label">Quality</div>
                <div className="verdict-score__value verdict-score__value--warn">63<small>%</small></div>
                <div className="verdict-score__bar"><span className="bar--warn" style={{ width: '63%' }} /></div>
                <div className="verdict-score__hint">Does it follow best practices?</div>
              </div>
              <div className="verdict-score">
                <div className="verdict-score__label">Impact</div>
                <div className="verdict-score__value">93<small>%</small></div>
                <div className="verdict-score__bar"><span style={{ width: '93%' }} /></div>
                <div className="verdict-score__hint">Average across 17 eval scenarios</div>
              </div>
              <div className="verdict-score">
                <div className="verdict-score__label">Security</div>
                <div className="verdict-score__value verdict-score__value--ok">Passed</div>
                <div className="verdict-score__bar verdict-score__bar--seg">
                  <span style={{ width: '24%' }} /><span style={{ width: '24%' }} /><span style={{ width: '24%' }} /><span style={{ width: '24%' }} />
                </div>
                <div className="verdict-score__hint">No known security issues</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>17 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
