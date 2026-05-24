import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLEX_MAX, FLEX_MIN, weightForProgress } from '../lib/flexAnim';

gsap.registerPlugin(ScrollTrigger);

// Stacked headline — the type IS the hero (Marin Kurir register).
const LINES = ['I love building', 'while I', 'design.'];
const SUBLINE = "I'm a hands-on, player coach, prototyping, shipping, and listening to customer voice.";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = root.querySelectorAll<HTMLElement>('[data-word]');
    const accent = root.querySelector<HTMLElement>('[data-accent]');

    if (reduce) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      if (accent) accent.style.fontVariationSettings = `"wght" ${FLEX_MAX}`;
      return;
    }

    const ctx = gsap.context(() => {
      // Kinetic entrance: words rise into place, line by line.
      gsap.from(words, {
        yPercent: 115,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.07,
        delay: 0.15,
      });

      // Scroll choreography: headline drifts up + fades, accent word fattens.
      // Weight ramps to full within the first ~40svh of scroll — while the word
      // is still on screen — instead of completing as the hero leaves the view.
      if (accent) {
        const obj = { p: 0 };
        accent.style.fontVariationSettings = `"wght" ${FLEX_MIN}`;
        gsap.to(obj, {
          p: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: '+=40%', scrub: 0.5 },
          onUpdate: () => {
            accent.style.fontVariationSettings = `"wght" ${Math.round(weightForProgress(obj.p))}`;
          },
        });
      }
      gsap.to(root.querySelector('[data-headline]'), {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={rootRef} className="container hero">
      <p className="kicker hero__kicker">Founding designer &amp; full-stack builder</p>

      <h1 className="hero__headline display" data-headline>
        {LINES.map((line, li) => {
          const isAccent = li === LINES.length - 1;
          return (
            <span className="hero__line" key={li} data-accent={isAccent ? '' : undefined}>
              <span className="hero__mask">
                <span className="hero__word" data-word>
                  {line}
                </span>
              </span>
            </span>
          );
        })}
      </h1>

      <p ref={subRef} className="hero__sub">
        {SUBLINE}
      </p>

      <span className="hero__scroll" aria-hidden="true">
        scroll <span className="hero__scroll-line" />
      </span>

      <style>{`
        .hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-block: clamp(6rem, 14vh, 10rem);
          position: relative;
        }
        .hero__kicker { margin-bottom: clamp(1.5rem, 4vw, 2.5rem); }
        .hero__headline {
          font-size: var(--display);
          line-height: 0.9;
          letter-spacing: -0.035em;
          font-weight: 800;
          text-wrap: balance;
        }
        .hero__line { display: block; }
        .hero__line:nth-child(2) { padding-left: clamp(1rem, 8vw, 8rem); }
        /* padding-bottom gives descenders (e.g. the "g" in "design.") room so
           the rise-in overflow:hidden mask doesn't clip them. */
        .hero__mask { display: block; overflow: hidden; padding-bottom: 0.2em; }
        .hero__word {
          display: block;
          font-variation-settings: 'wght' 800;
          will-change: transform;
        }
        .hero__line[data-accent] .hero__word {
          color: var(--fg);
          font-variation-settings: 'wght' 200;
        }
        .hero__sub {
          margin-top: clamp(1.75rem, 4vw, 2.75rem);
          color: var(--muted);
          /* Sized to sit on one line on desktop; wraps only on narrow viewports. */
          font-size: clamp(var(--step-0), 1.6vw, var(--step-1));
          line-height: 1.35;
          font-variation-settings: 'wght' 380;
          text-wrap: balance;
        }
        @media (min-width: 60rem) {
          .hero__sub { white-space: nowrap; }
        }
        .hero__scroll {
          position: absolute;
          left: var(--pad);
          bottom: clamp(1.5rem, 4vh, 3rem);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--faint);
          font-size: var(--step--1);
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hero__scroll-line {
          display: block;
          width: clamp(3rem, 8vw, 6rem);
          height: 1px;
          background: var(--line-strong);
          transform-origin: left;
          animation: heroScroll 2.4s var(--ease-out-quart) infinite;
        }
        @keyframes heroScroll {
          0%, 100% { transform: scaleX(0.3); opacity: 0.4; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__scroll-line { animation: none; transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </header>
  );
}
