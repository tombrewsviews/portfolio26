import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLEX_MAX, FLEX_MIN, weightForProgress } from '../lib/flexAnim';

gsap.registerPlugin(ScrollTrigger);

// Stacked headline — the type IS the hero (Marin Kurir register).
// The last line's verb cycles (text-rotate effect); the period stays fixed.
const LINES = ['I love building', 'while I'];
const ROTATING = ['design', 'listen', 'brainstorm'];
const ROTATE_INTERVAL = 2200; // ms each word stays before the next cycles in
const SUBLINE = "I'm a hands-on player coach — prototyping, shipping, and representing customer voice.";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const rotateRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const dotPrevX = useRef<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

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
      // The weight rides on the rotating wrapper so every cycled word inherits it.
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

  // Text-rotate: on each tick, exit the current word upward, then advance the
  // index — the index change mounts the next word and triggers its enter below.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      const wrap = rotateRef.current;
      const outgoing = wrap?.querySelectorAll<HTMLElement>('[data-rotate-char]');
      // FLIP "first": measured at swap time (just before the new word mounts),
      // with any leftover transform cleared so the delta is from the true x.
      const advance = () => {
        const dot = dotRef.current;
        if (dot) {
          gsap.set(dot, { x: 0 });
          dotPrevX.current = dot.getBoundingClientRect().left;
        }
        setWordIndex((i) => (i + 1) % ROTATING.length);
      };
      if (!outgoing || outgoing.length === 0) return advance();
      // Outgoing chars exit upward (y -120%), staggered from the last char.
      gsap.to(outgoing, {
        yPercent: -120,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
        stagger: { each: 0.025, from: 'end' },
        onComplete: advance,
      });
    }, ROTATE_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  // Enter animation: when the word changes, incoming chars rise from below
  // (y 100% → 0), staggered from the last char — matching 21st.dev text-rotate.
  // Spring (damping 30 / stiffness 400) ≈ a snappy back.out settle.
  useEffect(() => {
    const wrap = rotateRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const incoming = wrap.querySelectorAll<HTMLElement>('[data-rotate-char]');
    if (reduce) {
      gsap.set(incoming, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.fromTo(
      incoming,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.6)',
        stagger: { each: 0.025, from: 'end' },
      }
    );
  }, [wordIndex]);

  // The dot is one continuous element — it never re-enters; it only slides
  // sideways as the verb expands/contracts. Run as a layout effect so the
  // inverted start position is set before paint (no flash at the new spot).
  useLayoutEffect(() => {
    const dot = dotRef.current;
    if (!dot || dotPrevX.current == null) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fromX = dotPrevX.current - dot.getBoundingClientRect().left;
    dotPrevX.current = null;
    if (reduce || Math.abs(fromX) < 0.5) {
      gsap.set(dot, { x: 0 });
      return;
    }
    gsap.fromTo(dot, { x: fromX }, { x: 0, duration: 0.5, ease: 'power2.out' });
  }, [wordIndex]);

  const currentWord = ROTATING[wordIndex];

  return (
    <header ref={rootRef} className="container hero">
      <p className="kicker hero__kicker">Founding designer &amp; full-stack builder</p>

      <h1 className="hero__headline display" data-headline>
        {LINES.map((line, li) => (
          <span className="hero__line" key={li}>
            <span className="hero__mask">
              <span className="hero__word" data-word>
                {line}
              </span>
            </span>
          </span>
        ))}

        {/* Accent line: the verb rotates (design / listen / brainstorm),
            the period stays fixed. The scroll weight-ramp targets this line. */}
        <span className="hero__line hero__line--accent" data-accent>
          <span className="hero__mask">
            <span className="hero__word hero__word--rotate" data-word>
              <span className="hero__rotate" ref={rotateRef}>
                <span className="hero__rotate-word" key={wordIndex} aria-label={currentWord}>
                  {currentWord.split('').map((ch, ci) => (
                    <span className="hero__rotate-clip" key={ci} aria-hidden="true">
                      <span className="hero__rotate-char" data-rotate-char>
                        {ch}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
              <span className="hero__rotate-dot" ref={dotRef} aria-hidden="true">.</span>
            </span>
          </span>
        </span>
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
        /* padding-bottom gives descenders (e.g. the "g" in "design") room so
           the rise-in overflow:hidden mask doesn't clip them. */
        .hero__mask { display: block; overflow: hidden; padding-bottom: 0.2em; }
        .hero__word {
          display: block;
          font-variation-settings: 'wght' 800;
          will-change: transform;
        }
        .hero__line--accent .hero__word {
          color: var(--fg);
          font-variation-settings: 'wght' 200;
        }
        /* Rotating verb + fixed period sit on one baseline. */
        .hero__word--rotate { display: inline-flex; align-items: baseline; }
        /* Verb + dot stay in the title colour (inherit --fg from the accent line). */
        .hero__rotate { display: inline-flex; }
        .hero__rotate-word { display: inline-flex; }
        /* Each char rides in its own clip so the y-translate is masked top+bottom.
           padding-bottom matches .hero__mask so descenders aren't cut. */
        .hero__rotate-clip {
          display: inline-block;
          overflow: hidden;
          padding-bottom: 0.2em;
          margin-bottom: -0.2em;
        }
        .hero__rotate-char { display: inline-block; will-change: transform, opacity; }
        /* The period stays in the title colour and slides back and forth as the
           verb width changes — subtle horizontal drift, no pop. */
        .hero__rotate-dot {
          display: inline-block;
          will-change: transform;
        }
        .hero__sub {
          margin-top: clamp(1.75rem, 4vw, 2.75rem);
          color: var(--accent-bright);
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
