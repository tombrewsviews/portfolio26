import { Link } from 'react-router-dom';
import { projects } from '../../content/projects';
import { ArrowExt, ArrowInt, IntLink, Media } from './ui';

export default function SelectedWork() {
  const featured = projects.slice(0, 6);

  return (
    <section id="work" className="ed-section">
      <div className="ed-inner">
        <div className="ed-work-head">
          <h2 className="ed-heading ed-medium">Selected Work</h2>
          <IntLink to="/work" className="ed-subhead ed-grey ed-work-head__all">
            See All
          </IntLink>
        </div>

        <div className="ed-work-grid">
          {featured.map((p) => {
            const Inner = (
              <>
                <Media src={p.thumb} alt={p.title} ratio="4 / 3" label={p.title} />
                <div className="ed-work-card__row">
                  <div>
                    <h3 className="ed-subhead ed-medium">{p.title}</h3>
                    <p className="ed-body ed-grey" style={{ marginTop: 4 }}>
                      {p.subtitle} · {p.disciplines.join(', ')}
                    </p>
                  </div>
                  <span className="ed-work-card__tag ed-mini ed-grey">
                    {p.slug ? 'Case Study' : 'External'}
                    {p.slug ? <ArrowInt /> : <ArrowExt />}
                  </span>
                </div>
              </>
            );
            return (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="ed-card ed-work-card ed-link-group"
                style={{ display: 'block' }}
              >
                {Inner}
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .ed-work-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
        }
        .ed-work-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 768px) {
          .ed-work-grid { grid-template-columns: 1fr 1fr; gap: 48px; }
        }
        .ed-work-card { color: var(--ed-foreground); }
        .ed-work-card__row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-top: 16px;
        }
        .ed-work-card__tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          white-space: nowrap;
          padding-top: 6px;
        }
      `}</style>
    </section>
  );
}
