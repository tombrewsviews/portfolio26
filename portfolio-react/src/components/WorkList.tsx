import { useEffect, useRef } from 'react';
import TransitionLink from '../lib/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../content/projects';
import { FLEX_MIN, weightForProgress } from '../lib/flexAnim';

gsap.registerPlugin(ScrollTrigger);

export default function WorkList() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
        const title = row.querySelector<HTMLElement>('[data-title]');

        gsap.from(row, {
          yPercent: 30,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 92%' },
        });

        // Weight-on-scroll: title fattens as the row crosses the viewport.
        if (title) {
          const obj = { p: 0 };
          gsap.to(obj, {
            p: 1,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 40%', scrub: true },
            onUpdate: () => {
              if (!title.dataset.hover) {
                title.style.fontVariationSettings = `"wght" ${Math.round(weightForProgress(obj.p))}`;
              }
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const setHover = (el: HTMLElement | null, on: boolean) => {
    if (!el) return;
    if (on) {
      el.dataset.hover = '1';
      gsap.to(el, { fontVariationSettings: '"wght" 1000', duration: 0.5, ease: 'expo.out' });
    } else {
      delete el.dataset.hover;
      gsap.to(el, { fontVariationSettings: `"wght" ${FLEX_MIN}`, duration: 0.6, ease: 'expo.out' });
    }
  };

  return (
    <section id="work" ref={rootRef} className="container section work">
      <div className="work__head">
        <span className="kicker">Selected work</span>
        <span className="work__count">{projects.length} projects · 2023 — 2026</span>
      </div>

      <ul className="work__list">
        {projects.map((p) => (
          <li className="work__item" key={p.slug} data-row>
            <TransitionLink
              to={`/work/${p.slug}`}
              className="work__link"
              onMouseEnter={(e) => setHover(e.currentTarget.querySelector('[data-title]'), true)}
              onMouseLeave={(e) => setHover(e.currentTarget.querySelector('[data-title]'), false)}
            >
              <span className="work__index">[{p.projectNumber}]</span>

              <span className="work__title-wrap">
                <span className="work__title" data-title>
                  {p.title}
                </span>
              </span>

              <span className="work__meta">
                {/* List shows only the base subtitle; the "— Acquired by …"
                    suffix stays on the case-study page. */}
                <span className="work__disc">{p.subtitle.split('—')[0].trim()}</span>
                <span className="work__year">{p.year}</span>
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>

      <style>{`
        /* Matches .experiments__head so all section heads are identical. */
        .work__head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
          padding-bottom: clamp(1.25rem, 3vw, 2rem);
          border-bottom: 1px solid var(--line);
        }
        .work__count { color: var(--faint); font-size: var(--step--1); }
        .work__list { list-style: none; }
        .work__item { border-bottom: 1px solid var(--line); }

        .work__link {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          column-gap: clamp(1rem, 4vw, 3rem);
          row-gap: 0.5rem;
          padding-block: clamp(1.5rem, 4vw, 3rem);
          transition: padding-left 0.5s var(--ease-out-expo);
        }
        .work__link:hover { padding-left: clamp(0.5rem, 2vw, 2rem); }

        .work__index {
          color: var(--faint);
          font-size: var(--step-0);
          font-variation-settings: 'wght' 500;
          letter-spacing: 0.02em;
          align-self: start;
          padding-top: 0.4em;
          transition: color 0.4s var(--ease-out-quart);
        }
        .work__link:hover .work__index { color: var(--fg); }

        .work__title-wrap { display: flex; align-items: baseline; gap: 0.4em; min-width: 0; }
        .work__title {
          font-size: var(--display-work);
          line-height: 0.92;
          letter-spacing: -0.035em;
          font-variation-settings: 'wght' ${FLEX_MIN};
          white-space: nowrap;
        }

        .work__meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          gap: 0.2rem;
          align-self: start;
          padding-top: 0.4em;
        }
        .work__disc { color: var(--muted); font-size: var(--step--1); letter-spacing: 0.06em; text-transform: uppercase; }
        .work__year { color: var(--faint); font-size: var(--step--1); }

        @media (max-width: 768px) {
          .work__link { grid-template-columns: auto 1fr; }
          .work__title { white-space: normal; }
          .work__meta { grid-column: 1 / -1; flex-direction: row; align-items: baseline; justify-content: space-between; width: 100%; padding-top: 0.5rem; }
        }
      `}</style>
    </section>
  );
}
