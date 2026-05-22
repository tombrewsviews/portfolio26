import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function Challenges({ project }: { project: Project }) {
  return (
    <section className="container case-sec">
      <div className="case-sec__row">
        <span className="case-sec__label kicker">The challenges</span>
        <div className="case-sec__content">
          <div className="challenges">
            {project.challenges.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <article className="challenges__item">
                  <span className="challenges__idx">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="challenges__heading">{c.heading}</h3>
                    <p className="challenges__body measure">{c.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .challenges { display: grid; gap: clamp(1.75rem, 4vw, 2.75rem); }
        .challenges__item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(1rem, 3vw, 2rem);
          align-items: baseline;
          border-top: 1px solid var(--line);
          padding-top: clamp(1.25rem, 3vw, 2rem);
        }
        .challenges__idx { color: var(--faint); font-size: var(--step-0); font-variation-settings: 'wght' 500; }
        .challenges__heading {
          font-size: var(--step-2);
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-variation-settings: 'wght' 540;
        }
        .challenges__body { color: var(--muted); margin-top: 0.6rem; font-size: var(--step-0); line-height: 1.5; }
      `}</style>
    </section>
  );
}
