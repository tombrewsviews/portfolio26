import type { Shot } from '../../types';
import Reveal from '../Reveal';

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
}: {
  src?: string;
  ratio: string;
  marker?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`shot ${className}`}>
      <div className="shot__frame img-fallback" style={{ aspectRatio: ratio }}>
        {src && (
          <img
            className="shot__img"
            src={src}
            alt={caption ?? ''}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <span className="shot__placeholder" aria-hidden="true">
          Screenshot · coming soon
        </span>
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

  return (
    <section className={isBleed ? 'shots-bleed' : 'container shots-wrap'}>
      <Reveal>
        <div className={`shots shots--${shot.layout}`}>
          {shot.layout === 'pair' ? (
            <>
              <Frame
                src={shot.src}
                ratio={shot.ratio}
                marker={shot.marker}
                caption={shot.caption}
                className="shot--a"
              />
              <Frame
                src={shot.srcB}
                ratio={shot.ratio}
                marker={shot.markerB}
                caption={shot.captionB}
                className="shot--b"
              />
            </>
          ) : (
            <Frame
              src={shot.src}
              ratio={shot.ratio}
              marker={shot.marker}
              caption={shot.caption}
            />
          )}
        </div>
      </Reveal>

      <style>{`
        .shots-wrap { padding-block: clamp(0.5rem, 2vw, 1.5rem); }
        .shots-bleed { padding-block: clamp(1rem, 3vw, 2.5rem); }

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
        }
        .shot__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .shot__placeholder {
          color: var(--faint);
          font-size: var(--step--1);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-variation-settings: 'wght' 460;
          pointer-events: none;
        }
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
