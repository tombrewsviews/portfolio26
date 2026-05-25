import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { creative } from '../content/creative';

gsap.registerPlugin(ScrollTrigger);

export default function CreativeBanner() {
  // Split into two rows; top pans right, bottom pans left.
  const mid = Math.ceil(creative.length / 2);
  const topItems = creative.slice(0, mid);
  const bottomItems = creative.slice(mid);

  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll-controlled: pin the section, then drive the two rows in opposite
  // directions across the scroll distance. Each row starts pre-shifted toward
  // its "incoming" edge and resolves to the opposite as the user scrolls, so
  // the top slides right and the bottom slides left in lockstep.
  useEffect(() => {
    const section = sectionRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!section || !top || !bottom) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Overflow per row (how far each track can travel beyond the viewport).
      const topOverflow = () => Math.max(top.scrollWidth - window.innerWidth, 0);
      const bottomOverflow = () => Math.max(bottom.scrollWidth - window.innerWidth, 0);
      // Scroll distance = the larger overflow so both rows finish together.
      const distance = () => Math.max(topOverflow(), bottomOverflow());

      // Top row: start fully shifted left (off-screen), resolve to 0 → moves RIGHT.
      gsap.fromTo(
        top,
        { x: () => -topOverflow() },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );

      // Bottom row: start at 0, resolve to fully shifted left → moves LEFT.
      gsap.fromTo(
        bottom,
        { x: 0 },
        {
          x: () => -bottomOverflow(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const renderRow = (
    items: typeof creative,
    ref: React.RefObject<HTMLDivElement>
  ) => (
    <div className="banner__row">
      <div className="banner__track" ref={ref}>
        {items.map((c, i) => (
          <figure className="banner__fig" key={i}>
            <img
              className="banner__img img-fallback"
              src={c.src}
              alt={c.caption}
              loading="lazy"
              onError={(e) => { e.currentTarget.classList.add('is-missing'); }}
            />
          </figure>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="Creative work" className="banner" ref={sectionRef}>
      <div className="banner__viewport">
        {renderRow(topItems, topRef)}
        {renderRow(bottomItems, bottomRef)}
      </div>

      <style>{`
        .banner {
          background: var(--bg-deep);
          overflow: hidden;
        }
        /* Pinned viewport is one screen tall; two rows pan across it. */
        .banner__viewport {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(1rem, 2vw, 2rem);
          overflow: hidden;
        }
        .banner__row { overflow: hidden; }
        .banner__track {
          display: flex;
          gap: clamp(1rem, 2vw, 2rem);
          width: max-content;
          will-change: transform;
        }
        .banner__fig {
          position: relative;
          flex: 0 0 auto;
          width: clamp(15rem, 28vw, 30rem);
        }
        .banner__img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
        }
        .banner__img.is-missing { font-size: 0; } /* hide broken-image glyph; keep textured box */
        figure.banner__fig { margin: 0; }
        /* No pin/scrub when motion is reduced — fall back to plain swipe strips. */
        @media (prefers-reduced-motion: reduce) {
          .banner__viewport { height: auto; padding-block: clamp(2.5rem, 7vw, 6rem); }
          .banner__row { overflow-x: auto; }
          .banner__track { transform: none !important; padding-inline: var(--pad); }
        }
      `}</style>
    </section>
  );
}
