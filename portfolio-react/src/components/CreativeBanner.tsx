import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { creative } from '../content/creative';

gsap.registerPlugin(ScrollTrigger);

export default function CreativeBanner() {
  const items = [...creative, ...creative];
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll velocity nudges the marquee speed for a kinetic, alive feel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1400, 4);
        gsap.to(track, { '--marquee-speed': boost, duration: 0.6, ease: 'power2.out', overwrite: true });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section aria-label="Creative work" className="banner">
      <div className="banner__wrap">
        <div className="banner__track" ref={trackRef}>
          {items.map((c, i) => (
            <figure className="banner__fig" key={i}>
              <span className="banner__num">{String((i % creative.length) + 1).padStart(2, '0')}</span>
              <img
                className="banner__img img-fallback"
                src={c.src}
                alt={c.caption}
                loading="lazy"
                onError={(e) => { e.currentTarget.classList.add('is-missing'); }}
              />
              <figcaption className="banner__cap">{c.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .banner {
          padding-block: clamp(2.5rem, 7vw, 6rem);
          border-block: 1px solid var(--line);
          background: var(--bg-deep);
        }
        .banner__wrap { overflow: hidden; }
        .banner__track {
          --marquee-speed: 1;
          display: flex;
          gap: clamp(1rem, 2vw, 2rem);
          width: max-content;
          animation: bannerMarquee 48s linear infinite;
          animation-play-state: running;
          will-change: transform;
        }
        .banner__track:hover { animation-play-state: paused; }
        @keyframes bannerMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
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
        .banner__num {
          position: absolute;
          top: 0.6rem; left: 0.7rem;
          font-size: var(--step--1);
          color: var(--fg);
          font-variation-settings: 'wght' 600;
          mix-blend-mode: difference;
          z-index: 2;
        }
        .banner__cap {
          margin-top: 0.6rem;
          color: var(--faint);
          font-size: var(--step--1);
          letter-spacing: 0.04em;
        }
        @media (prefers-reduced-motion: reduce) {
          .banner__wrap { overflow-x: auto; }
          .banner__track { animation: none; }
        }
      `}</style>
    </section>
  );
}
