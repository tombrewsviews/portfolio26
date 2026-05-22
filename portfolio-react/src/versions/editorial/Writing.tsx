import { experiments } from '../../content/experiments';
import { ArrowExt, Media } from './ui';

// Maps Tom's experiments/writing into article-style cards with categories.
const CATEGORIES = ['Tooling', 'AI & Agents', 'Process', 'Resources'];
const DATE = 'February 2026';

export default function Writing() {
  const items = experiments.slice(0, 4);

  return (
    <section id="writing" className="ed-section">
      <div className="ed-inner">
        <div className="ed-writing-head">
          <h2 className="ed-heading ed-medium">Writing &amp; Experiments</h2>
          <ArrowExt />
        </div>

        <div className="ed-writing-grid">
          {items.map((it, i) => {
            const href = it.links[0]?.href ?? '#';
            return (
              <a
                key={it.title}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="ed-card ed-writing-card ed-link-group"
              >
                <Media src="" alt={it.title} ratio="3 / 2" label={CATEGORIES[i % CATEGORIES.length]} />
                <div style={{ marginTop: 16 }}>
                  <span className="ed-mini ed-grey">{CATEGORIES[i % CATEGORIES.length]} · {DATE}</span>
                  <h3 className="ed-body-lg ed-medium ed-writing-card__title">
                    <span className="ed-underline">{it.title}</span>
                  </h3>
                  <p className="ed-body ed-grey" style={{ marginTop: 8 }}>
                    {it.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .ed-writing-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .ed-writing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 640px) {
          .ed-writing-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .ed-writing-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
        }
        .ed-writing-card { color: var(--ed-foreground); display: block; }
        .ed-writing-card__title { margin-top: 6px; }
      `}</style>
    </section>
  );
}
