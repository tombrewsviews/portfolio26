import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function Overview({ project }: { project: Project }) {
  return (
    <section className="container case-sec">
      <Reveal>
        <div className="case-sec__row">
          <span className="case-sec__label kicker">Overview</span>
          <div className="case-sec__content">
            <dl className="overview__specs">
              <div>
                <dt>Year</dt>
                <dd>{project.overview.date}</dd>
              </div>
              <div>
                <dt>Categories</dt>
                <dd>{project.overview.categories.join(', ')}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.disciplines.join(', ')}</dd>
              </div>
            </dl>
            <p className="overview__about measure">{project.about}</p>
          </div>
        </div>
      </Reveal>

      <style>{`
        .overview__specs {
          display: grid;
          gap: clamp(1.25rem, 3vw, 2rem);
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
          padding-bottom: clamp(1.75rem, 4vw, 2.75rem);
          border-bottom: 1px solid var(--line);
        }
        .overview__specs dt { color: var(--faint); font-size: var(--step--1); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.4rem; }
        .overview__specs dd { font-size: var(--step-0); font-variation-settings: 'wght' 460; }
        .overview__about {
          margin-top: clamp(1.75rem, 4vw, 2.75rem);
          font-size: var(--step-1);
          line-height: 1.4;
          font-variation-settings: 'wght' 400;
        }
      `}</style>
    </section>
  );
}
