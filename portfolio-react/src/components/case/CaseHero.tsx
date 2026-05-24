import { useEffect, useRef } from 'react';
import TransitionLink from '../../lib/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../../types';
import { FLEX_MAX, FLEX_MIN, weightForProgress } from '../../lib/flexAnim';

gsap.registerPlugin(ScrollTrigger);

/**
 * Case-study hero. Same signature motion as the home Hero: the title is the
 * register — words rise from behind an overflow mask on enter, the headline
 * drifts up under scroll, and the title fattens its Roboto Flex weight as the
 * page scrolls. Meta + sub fade-rise in behind it.
 */
export default function CaseHero({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);

  // Split the title into words so each rises independently behind the mask.
  const words = project.title.split(/\s+/);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wordEls = root.querySelectorAll<HTMLElement>('[data-word]');
    const title = root.querySelector<HTMLElement>('[data-title]');

    if (reduce) {
      gsap.set(wordEls, { yPercent: 0, opacity: 1 });
      if (title) title.style.fontVariationSettings = `"wght" ${FLEX_MAX}`;
      return;
    }

    const ctx = gsap.context(() => {
      // Kinetic entrance: title words rise into place.
      gsap.from(wordEls, {
        yPercent: 115,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.07,
        delay: 0.1,
      });

      // Meta row + subtitle fade-rise just after the title lands.
      gsap.from(root.querySelectorAll<HTMLElement>('[data-rise]'), {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.35,
      });

      // Scroll choreography: headline drifts up + title weight fattens.
      // Weight ramps to full within the first ~40svh of scroll — while the title
      // is still on screen — instead of completing as the hero leaves the view.
      if (title) {
        const obj = { p: 0 };
        title.style.fontVariationSettings = `"wght" ${FLEX_MIN}`;
        gsap.to(obj, {
          p: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: '+=40%', scrub: 0.5 },
          onUpdate: () => {
            title.style.fontVariationSettings = `"wght" ${Math.round(weightForProgress(obj.p))}`;
          },
        });
      }
      gsap.to(root.querySelector('[data-headline]'), {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 },
      });
    }, root);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <>
      <nav className="case-nav">
        <div className="container">
          <TransitionLink to="/#work" className="case-nav__back">← All work</TransitionLink>
        </div>
      </nav>

      <header ref={rootRef} className="container case-hero">
      <div className="case-hero__meta" data-rise>
        <span>{project.year}</span>
      </div>

      <h1 className="case-hero__title display" data-headline>
        <span className="case-hero__title-inner" data-title>
          {words.map((w, i) => (
            <span className="case-hero__mask" key={i}>
              <span className="case-hero__word" data-word>
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <p className="case-hero__sub" data-rise>{project.subtitle}</p>

      <style>{`
        .case-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          mix-blend-mode: difference;
          padding-block: clamp(1rem, 2vw, 1.6rem);
        }
        .case-nav__back {
          display: inline-block;
          color: var(--fg);
          font-size: var(--step--1);
          letter-spacing: 0.04em;
          font-variation-settings: 'wght' 500;
          transition: opacity 0.3s var(--ease-out-quart);
        }
        .case-nav__back:hover { opacity: 0.55; }
        .case-hero { padding-block: clamp(2rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem); }
        .case-hero__meta {
          display: flex;
          gap: 1.5rem;
          margin-top: clamp(2.5rem, 6vw, 4rem);
          color: var(--faint);
          font-size: var(--step--1);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .case-hero__title {
          font-size: var(--display-work);
          line-height: 0.9;
          letter-spacing: -0.035em;
          margin-top: 0.5rem;
          text-wrap: balance;
        }
        .case-hero__title-inner { display: inline; font-variation-settings: 'wght' ${FLEX_MIN}; }
        /* Each word sits behind its own clip so the rise has a hard edge. */
        .case-hero__mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.08em;
        }
        .case-hero__word { display: inline-block; will-change: transform; }
        .case-hero__sub {
          margin-top: clamp(0.75rem, 2vw, 1.25rem);
          color: var(--muted);
          font-size: var(--step-1);
          font-variation-settings: 'wght' 380;
        }
      `}</style>
      </header>
    </>
  );
}
