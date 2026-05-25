import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sources } from '../content/sources';
import AsciiDither from './AsciiDither';

gsap.registerPlugin(ScrollTrigger);

/**
 * Colophon: the tools that built the site, over a living ASCII dither field.
 *
 * The list is an index, not a card grid: a leading two-digit ordinal, the skill
 * name, then its note, each row on a hairline so it reads like a printed credits
 * roll. Rows mask-rise on scroll in a quick stagger; hovering a row lifts the
 * dither out from behind it (the canvas already swells toward the pointer) and
 * brings the row to full contrast. The section sits on the deepest background so
 * the dither has somewhere dark to live.
 */
export default function SourcesColophon() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Kicker draws itself in, character by character, like a print head.
      const heading = root.querySelector<HTMLElement>('[data-colophon-head]');
      if (heading && !reduce) {
        gsap.from(heading, {
          opacity: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: root, start: 'top 80%' },
        });
      }

      const rows = root.querySelectorAll<HTMLElement>('[data-colophon-row]');
      if (reduce) {
        gsap.set(rows, { opacity: 1, yPercent: 0 });
        return;
      }
      rows.forEach((row, i) => {
        gsap.from(row, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          delay: (i % 6) * 0.04,
          scrollTrigger: { trigger: row, start: 'top 94%' },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="colophon" aria-label="Tools used to design this site">
      <AsciiDither className="colophon__dither" />
      <div className="colophon__scrim" aria-hidden="true" />

      <div className="container colophon__inner">
        <h2 className="colophon__head" data-colophon-head>
          <span className="colophon__head-mark" aria-hidden="true">/* </span>
          Creative AI solutions used to design this site
          <span className="colophon__head-mark" aria-hidden="true"> */</span>
        </h2>

        <ol className="colophon__list">
          {sources.map((src, i) => (
            <li className="colophon__row-wrap" key={src.name} data-colophon-row>
              <a
                className="colophon__row"
                href={src.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="colophon__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="colophon__name">{src.name}</span>
                <span className="colophon__note">{src.note}</span>
                <span className="colophon__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .colophon {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: var(--bg);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding-block: clamp(4rem, 9vw, 7.5rem);
        }
        /* The dither fills the section, sitting behind everything. Glyph colour
           is set on the canvas in JS (reads --accent); screen-blend + opacity
           keep it a quiet, tinted texture rather than a loud teal field. */
        .colophon__dither {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          opacity: 0.5;
          mix-blend-mode: screen;
        }
        /* Gentle scrim: knocks the dither back enough for legible text while
           letting it read across the whole section, densest toward the edges. */
        .colophon__scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(140% 110% at 35% 45%,
              color-mix(in oklch, var(--bg), transparent 30%) 0%,
              color-mix(in oklch, var(--bg), transparent 8%) 65%,
              var(--bg) 100%);
          pointer-events: none;
        }

        .colophon__head {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: var(--step--1);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: clamp(2rem, 5vw, 3.5rem);
        }
        .colophon__head-mark { color: var(--faint); }

        .colophon__list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 26rem), 1fr));
          column-gap: clamp(2rem, 5vw, 5rem);
        }
        /* Wrapper clips the mask-rise so rows enter from behind the hairline. */
        .colophon__row-wrap {
          border-top: 1px solid color-mix(in oklch, var(--line), transparent 35%);
          overflow: hidden;
        }
        .colophon__row {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: baseline;
          column-gap: 0.9rem;
          padding-block: clamp(0.7rem, 1.6vw, 1rem);
          color: var(--fg);
          transition: padding 0.45s var(--ease-out-expo);
        }
        .colophon__row::before {
          /* Wash of the foreground that fades in under the row on hover. */
          content: '';
          position: absolute;
          inset: 0 -0.9rem;
          background: color-mix(in oklch, var(--fg), transparent 94%);
          opacity: 0;
          transition: opacity 0.4s var(--ease-out-quart);
          z-index: -1;
        }
        /* Symmetric inset on hover so the note pulls in from the right edge by
           the same amount the row shifts in from the left. */
        .colophon__row:hover { padding-inline: 0.7rem; }
        .colophon__row:hover::before { opacity: 1; }

        .colophon__idx {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: var(--step--1);
          color: var(--faint);
          font-variation-settings: 'wght' 500;
          transition: color 0.4s var(--ease-out-quart);
        }
        .colophon__row:hover .colophon__idx { color: var(--fg); }

        .colophon__name {
          font-size: var(--step-0);
          font-variation-settings: 'wght' 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .colophon__note {
          color: var(--faint);
          font-size: var(--step--1);
          letter-spacing: 0.01em;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color 0.4s var(--ease-out-quart);
        }
        .colophon__row:hover .colophon__note { color: var(--muted); }

        .colophon__arrow {
          font-size: var(--step--1);
          color: var(--faint);
          opacity: 0;
          transform: translate(-0.35em, 0);
          transition: opacity 0.4s var(--ease-out-expo), transform 0.5s var(--ease-out-expo), color 0.4s;
        }
        .colophon__row:hover .colophon__arrow { opacity: 1; transform: translate(0, 0); color: var(--accent-bright); }

        @media (prefers-reduced-motion: reduce) {
          .colophon__dither { opacity: 0.32; }
        }
      `}</style>
    </section>
  );
}
