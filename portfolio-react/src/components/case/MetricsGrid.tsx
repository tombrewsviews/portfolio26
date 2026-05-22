import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function MetricsGrid({ project }: { project: Project }) {
  return (
    <section className="container case-sec">
      <div className="case-sec__row">
        <span className="case-sec__label kicker">Success metrics</span>
        <div className="case-sec__content">
          <div className="metrics">
            {project.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="metrics__item">
                  <div className="metrics__value">{m.value}</div>
                  <div className="metrics__label">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .metrics {
          display: grid;
          gap: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem);
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
        }
        .metrics__item { border-top: 1px solid var(--line-strong); padding-top: clamp(1rem, 2vw, 1.5rem); }
        .metrics__value {
          font-size: var(--step-3);
          line-height: 0.95;
          letter-spacing: -0.03em;
          font-variation-settings: 'wght' 620;
        }
        .metrics__label { color: var(--muted); font-size: var(--step--1); margin-top: 0.5rem; letter-spacing: 0.02em; }
      `}</style>
    </section>
  );
}
