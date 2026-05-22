import TransitionLink from '../../lib/TransitionLink';
import type { Project } from '../../types';

/**
 * Calm closing link at the foot of a case study, pointing to the next
 * project so readers continue through the work instead of returning to
 * the index. Deliberately quiet: one eyebrow, a large title, one image,
 * a single soft lift on hover — no floating thumbs or padding shifts.
 */
export default function NextCase({ project }: { project: Project }) {
  return (
    <section className="container next-case">
      <TransitionLink to={`/work/${project.slug}`} className="next-case__link">
        <span className="next-case__eyebrow kicker">Next project</span>

        <div className="next-case__row">
          <div className="next-case__text">
            <h2 className="next-case__title">{project.title}</h2>
            <p className="next-case__sub">{project.subtitle}</p>
          </div>

          <div className="next-case__thumb-wrap">
            <img
              className="next-case__thumb img-fallback"
              src={project.thumb}
              alt=""
              loading="lazy"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            />
          </div>
        </div>
      </TransitionLink>

      <style>{`
        .next-case {
          padding-block: clamp(4rem, 10vw, 8rem);
          border-top: 1px solid var(--line);
        }
        .next-case__link {
          display: block;
          border-radius: 1.25rem;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          margin-inline: calc(clamp(1.5rem, 4vw, 2.5rem) * -1);
          transition: background-color 0.5s var(--ease-out-quart);
        }
        .next-case__link:hover {
          background-color: oklch(0.20 0.006 250);
        }

        .next-case__eyebrow { color: var(--faint); }

        .next-case__row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: clamp(1.5rem, 5vw, 4rem);
          margin-top: clamp(1.25rem, 3vw, 2rem);
        }

        .next-case__title {
          font-size: clamp(2.4rem, 1rem + 6vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: -0.035em;
          font-variation-settings: 'wght' 600;
          color: var(--fg);
          transition: opacity 0.4s var(--ease-out-quart);
        }
        .next-case__sub {
          margin-top: clamp(0.5rem, 1.5vw, 0.9rem);
          color: var(--muted);
          font-size: var(--step-0);
          font-variation-settings: 'wght' 380;
        }

        .next-case__thumb-wrap { flex-shrink: 0; }
        .next-case__thumb {
          width: clamp(7rem, 16vw, 13rem);
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 1rem;
          transition: transform 0.6s var(--ease-out-expo);
        }
        .next-case__link:hover .next-case__thumb {
          transform: scale(1.03);
        }

        @media (max-width: 640px) {
          .next-case__row { grid-template-columns: 1fr; }
          .next-case__thumb { width: 100%; aspect-ratio: 16 / 9; }
        }
      `}</style>
    </section>
  );
}
