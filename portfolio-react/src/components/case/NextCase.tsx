import { useEffect, useRef } from 'react';
import TransitionLink from '../../lib/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../../types';
import { FLEX_MIN, weightForProgress } from '../../lib/flexAnim';

gsap.registerPlugin(ScrollTrigger);

/**
 * Closing link at the foot of a case study, pointing to the next project.
 * A two-column card — preview thumbnail on the left, title + meta stacked on
 * the right — with no dividing rules (the case pages dropped section lines).
 * Keeps the signature motion: the card rises in, the title fattens its Roboto
 * Flex weight as it crosses the viewport, and snaps to full weight on hover.
 */
export default function NextCase({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const card = root.querySelector<HTMLElement>('[data-card]');
      const title = root.querySelector<HTMLElement>('[data-title]');
      if (!card) return;

      gsap.from(card, {
        yPercent: 18,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 92%' },
      });

      // Weight-on-scroll: title fattens as the card crosses the viewport.
      if (title) {
        const obj = { p: 0 };
        gsap.to(obj, {
          p: 1,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 45%', scrub: true },
          onUpdate: () => {
            if (!title.dataset.hover) {
              title.style.fontVariationSettings = `"wght" ${Math.round(weightForProgress(obj.p))}`;
            }
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [project.slug]);

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
    <section ref={rootRef} className="container next-case">
      <TransitionLink
        to={`/work/${project.slug}`}
        className="next-case__card"
        data-card
        onMouseEnter={(e) => setHover(e.currentTarget.querySelector('[data-title]'), true)}
        onMouseLeave={(e) => setHover(e.currentTarget.querySelector('[data-title]'), false)}
      >
        <img
          className="next-case__thumb img-fallback"
          src={project.thumb}
          alt=""
          loading="lazy"
          onError={(e) => { e.currentTarget.classList.add('is-missing'); }}
        />

        <div className="next-case__body">
          <span className="next-case__eyebrow kicker">
            Next project <span className="next-case__arrow" aria-hidden="true">↗</span>
          </span>

          <span className="next-case__title display" data-title>{project.title}</span>

          <span className="next-case__meta">
            <span className="next-case__disc">{project.subtitle}</span>
            <span className="next-case__dot" aria-hidden="true">·</span>
            <span className="next-case__year">{project.year}</span>
          </span>
        </div>
      </TransitionLink>

      <style>{`
        /* Rule above fences the closing block off from the case study; the
           Footer's own top rule provides the line below. Extra vertical padding
           makes the Next-project block stand out. */
        .next-case {
          padding-block: clamp(6rem, 14vw, 11rem);
          border-top: 1px solid var(--line);
        }
        .next-case__card {
          display: grid;
          grid-template-columns: clamp(12rem, 28vw, 22rem) 1fr;
          align-items: center;
          gap: clamp(1.5rem, 5vw, 4rem);
          transition: transform 0.6s var(--ease-out-expo);
        }
        .next-case__card:hover { transform: translateY(-6px); }

        /* 16/9 matches the hero images so object-fit:cover doesn't crop them.
           Border + radius match .shot__frame for a consistent media treatment. */
        .next-case__thumb {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          border: 1px solid var(--line);
          border-radius: clamp(0.5rem, 1.2vw, 1rem);
          transition: transform 0.7s var(--ease-out-expo), filter 0.5s var(--ease-out-quart);
          filter: grayscale(1) brightness(0.85);
        }
        .next-case__card:hover .next-case__thumb { transform: scale(1.02); filter: grayscale(0) brightness(1); }
        .next-case__thumb.is-missing { font-size: 0; } /* hide broken-image glyph; keep textured box */

        .next-case__body { display: flex; flex-direction: column; min-width: 0; }
        .next-case__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          color: var(--faint);
          margin-bottom: clamp(0.75rem, 2vw, 1.25rem);
        }
        .next-case__arrow {
          display: inline-block;
          color: var(--muted);
          transform: translate(-0.3em, 0);
          opacity: 0;
          transition: opacity 0.4s var(--ease-out-expo), transform 0.5s var(--ease-out-expo), color 0.4s;
        }
        .next-case__card:hover .next-case__arrow { opacity: 1; transform: translate(0, 0); color: var(--accent-bright); }

        .next-case__title {
          font-size: var(--display-work);
          line-height: 0.9;
          letter-spacing: -0.035em;
          font-variation-settings: 'wght' ${FLEX_MIN};
        }

        .next-case__meta {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.5em;
          margin-top: clamp(0.75rem, 2vw, 1.25rem);
          font-size: var(--step--1);
        }
        .next-case__disc { color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
        .next-case__dot { color: var(--faint); }
        .next-case__year { color: var(--faint); }

        @media (max-width: 768px) {
          .next-case__card { grid-template-columns: 1fr; gap: clamp(1.25rem, 5vw, 2rem); }
        }
        @media (hover: none) {
          .next-case__thumb { filter: none; }
          .next-case__arrow { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
