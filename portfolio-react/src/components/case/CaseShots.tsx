import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Shot } from '../../types';
import Reveal from '../Reveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Screenshots interleaved between case-study sections.
 *
 * Every variant places its frame(s) on the SAME 12-column grid (`.shots`),
 * so widths and offsets vary between sections — full-bleed hero, offset wide,
 * a staggered pair, a small corner shot — yet always snap to the same column
 * lines. That is the Marin Kurir "unpredictable but on-grid" feel.
 *
 * Column spans per layout:
 *   bleed        — breaks the container, full viewport width
 *   full         — cols 1–12
 *   wide-left    — cols 1–9   (right margin open)
 *   wide-right   — cols 4–12  (left margin open)
 *   narrow-left  — cols 1–5   (hugs left)
 *   narrow-right — cols 8–12  (hugs right)
 *   pair         — cols 1–6 + 7–12, second frame dropped lower for stagger
 */

function Frame({
  src,
  ratio,
  marker,
  caption,
  className = '',
  eager = false,
  nda = false,
}: {
  src?: string;
  ratio: string;
  marker?: string;
  caption?: string;
  className?: string;
  /** Lead/bleed shots load eagerly + high priority so they paint fast. */
  eager?: boolean;
  /** Show the "Under NDA" tint + text over the frame. */
  nda?: boolean;
}) {
  return (
    <figure className={`shot ${className}`}>
      <div className="shot__frame img-fallback" style={{ aspectRatio: ratio }}>
        {src && (
          <img
            className="shot__img"
            src={src}
            alt={caption ?? ''}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        {/* Overlay sits above the image, darkens on hover; NDA text rides on top. */}
        {nda && (
          <div className="shot__overlay">
            <span className="shot__placeholder">
              Under NDA • Showcase over a private call only
            </span>
          </div>
        )}
      </div>
      {(marker || caption) && (
        <figcaption className="shot__cap">
          {marker && <span className="shot__marker">{marker}</span>}
          {caption && <span className="shot__label">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export default function CaseShots({ shot }: { shot: Shot }) {
  const isBleed = shot.layout === 'bleed';
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Image breathes in — a subtle ken-burns settle inside the fixed
      // bordered frame, layered over the Reveal fade-up. Matches the
      // floating-thumb scale vocabulary on the home WorkList rows. Only the
      // image scales, so the frame border stays crisp.
      root.querySelectorAll<HTMLElement>('.shot__img').forEach((img) => {
        gsap.from(img, {
          scale: 1.1,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: img.closest('.shot__frame'), start: 'top 88%' },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [shot]);

  return (
    <section ref={rootRef} className={isBleed ? 'shots-bleed' : 'container shots-wrap'}>
      <Reveal>
        {/* Outer row mirrors .case-sec__row so the inner shot grid lines up with body text. */}
        <div className={isBleed ? '' : 'shots-row'}>
          <div className={`shots shots--${shot.layout}`}>
            {shot.layout === 'pair' ? (
              <>
                <Frame
                  src={shot.src}
                  ratio={shot.ratio}
                  marker={shot.marker}
                  caption={shot.caption}
                  className="shot--a"
                  nda={shot.nda}
                />
                <Frame
                  src={shot.srcB}
                  ratio={shot.ratio}
                  marker={shot.markerB}
                  caption={shot.captionB}
                  className="shot--b"
                  nda={shot.nda}
                />
              </>
            ) : (
              <Frame
                src={shot.src}
                ratio={shot.ratio}
                marker={shot.marker}
                caption={shot.caption}
                eager={isBleed}
                nda={shot.nda}
              />
            )}
          </div>
        </div>
      </Reveal>

      <style>{`
        .shots-wrap { padding-block: clamp(0.5rem, 2vw, 1.5rem); }
        .shots-bleed { padding-block: clamp(1rem, 3vw, 2.5rem); }

        /* Mirror .case-sec__row: an empty label-width rail on the left so the
           shot grid's left edge lines up with the body text's content column. */
        .shots-row {
          display: grid;
          grid-template-columns: minmax(8rem, 14rem) 1fr;
          gap: clamp(1.5rem, 4vw, 4rem);
        }
        .shots-row > .shots { grid-column: 2; }

        /* Shared 12-column backbone — every layout aligns to these tracks. */
        .shots {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: clamp(0.75rem, 2vw, 1.5rem);
        }

        /* Full-bleed: span the viewport, ignore the container's 12 tracks. */
        .shots--bleed {
          grid-template-columns: 1fr;
          padding-inline: var(--pad);
          max-width: var(--maxw);
          margin-inline: auto;
        }

        /* Below the section breakpoint the label column collapses, so should the rail. */
        @media (max-width: 768px) {
          .shots-row { grid-template-columns: 1fr; gap: 0; }
          .shots-row > .shots { grid-column: 1; }
        }

        .shots--full > .shot { grid-column: 1 / 13; }
        .shots--wide-left > .shot { grid-column: 1 / 10; }
        .shots--wide-right > .shot { grid-column: 4 / 13; }
        .shots--narrow-left > .shot { grid-column: 1 / 6; }
        .shots--narrow-right > .shot { grid-column: 8 / 13; }

        /* Pair: two frames on the same row, the second nudged down for stagger. */
        .shots--pair > .shot--a { grid-column: 1 / 7; }
        .shots--pair > .shot--b { grid-column: 7 / 13; margin-top: clamp(1.5rem, 5vw, 3.5rem); }

        .shot { min-width: 0; }
        .shot__frame {
          position: relative;
          overflow: hidden;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: clamp(0.5rem, 1.2vw, 1rem);
        }
        .shot__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* Tint over the image, holding the NDA text; deepens on hover. */
        .shot__overlay {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.35);
          transition: background 0.5s var(--ease-out-quart);
        }
        .shot__frame:hover .shot__overlay { background: rgba(0, 0, 0, 0.62); }
        .shot__placeholder {
          color: var(--fg);
          font-size: var(--step--1);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-variation-settings: 'wght' 460;
          pointer-events: none;
          transition: opacity 0.5s var(--ease-out-quart);
        }
        .shot__frame:hover .shot__placeholder { opacity: 0.85; }
        .shot__cap {
          display: flex;
          gap: 0.6rem;
          align-items: baseline;
          margin-top: 0.7rem;
          color: var(--muted);
          font-size: var(--step--1);
        }
        .shot__marker {
          color: var(--faint);
          letter-spacing: 0.1em;
          font-variation-settings: 'wght' 560;
          white-space: nowrap;
        }
        .shot__label { font-variation-settings: 'wght' 420; }

        /* On small screens collapse offsets/pairs to full width — still aligned. */
        @media (max-width: 768px) {
          .shots { grid-template-columns: 1fr; }
          .shots--full > .shot,
          .shots--wide-left > .shot,
          .shots--wide-right > .shot,
          .shots--narrow-left > .shot,
          .shots--narrow-right > .shot,
          .shots--pair > .shot--a,
          .shots--pair > .shot--b { grid-column: 1; }
          .shots--pair > .shot--b { margin-top: 0; }
        }
      `}</style>
    </section>
  );
}
