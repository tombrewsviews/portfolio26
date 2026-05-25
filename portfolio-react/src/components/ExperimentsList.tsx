import { experiments } from '../content/experiments';
import Reveal from './Reveal';

export default function ExperimentsList() {
  return (
    <section className="container section experiments">
      <div className="experiments__head">
        <span className="kicker">Design engineering experiments</span>
        <span className="experiments__note">Built in public, shipped weekly</span>
      </div>

      <div className="experiments__list">
        {experiments.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.05}>
            <article className="experiments__item">
              <span className="experiments__idx">{String(i + 1).padStart(2, '0')}</span>
              <div className="experiments__body">
                <h3 className="experiments__title">{e.title}</h3>
                <p className="experiments__desc measure">{e.description}</p>
              </div>
              <div className="experiments__links">
                {e.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="experiments__link">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <style>{`
        .experiments__head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: clamp(1.25rem, 3vw, 2rem);
          border-bottom: 1px solid var(--line);
        }
        .experiments__note { color: var(--faint); font-size: var(--step--1); }
        .experiments__item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: baseline;
          column-gap: clamp(1rem, 4vw, 3rem);
          row-gap: 0.75rem;
          padding-block: clamp(1.75rem, 4vw, 2.75rem);
          border-bottom: 1px solid var(--line);
        }
        .experiments__idx { color: var(--faint); font-size: var(--step-0); font-variation-settings: 'wght' 500; }
        .experiments__title {
          font-size: var(--step-2);
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-variation-settings: 'wght' 560;
        }
        .experiments__desc {
          margin-top: 0.6rem;
          color: var(--muted);
          font-size: var(--step-0);
          line-height: 1.5;
        }
        .experiments__links { display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; }
        .experiments__link {
          font-size: var(--step--1);
          color: var(--muted);
          letter-spacing: 0.02em;
          transition: color 0.3s var(--ease-out-quart);
          white-space: nowrap;
        }
        .experiments__link:hover { color: var(--accent-bright); }
        @media (max-width: 720px) {
          .experiments__item { grid-template-columns: auto 1fr; }
          .experiments__links { grid-column: 1 / -1; flex-direction: row; align-items: baseline; gap: 1.25rem; }
        }
      `}</style>
    </section>
  );
}
