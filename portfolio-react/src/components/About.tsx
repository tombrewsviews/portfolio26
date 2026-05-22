import { useState } from 'react';

export default function About() {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="container section about">
      <button
        className="about__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="about__sign">[{open ? '–' : '+'}]</span>
        <span>A bit more about me</span>
      </button>

      <div className={`about__reveal ${open ? 'is-open' : ''}`}>
        <div className="about__inner">
          <p className="about__lead measure">
            I'm a founding designer and full-stack builder. I design products and build the things I
            design: shipping every week, learning in public, treating AI as a collaborator rather
            than a shortcut.
          </p>
          <p className="about__body measure">
            My work sits where product design meets design engineering. I take an idea from research
            and flows through to a real, deployed interface, owning the design system that holds it
            together along the way.
          </p>
        </div>
      </div>

      <style>{`
        .about__toggle {
          display: flex;
          align-items: baseline;
          gap: clamp(0.75rem, 2vw, 1.25rem);
          background: none;
          border: none;
          color: var(--fg);
          cursor: pointer;
          text-align: left;
          font-size: var(--step-2);
          font-variation-settings: 'wght' 560;
          letter-spacing: -0.02em;
          line-height: 1.05;
        }
        .about__sign { color: var(--faint); font-variation-settings: 'wght' 400; }
        .about__toggle:hover .about__sign { color: var(--fg); }

        .about__reveal {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.6s var(--ease-out-expo);
        }
        .about__reveal.is-open { grid-template-rows: 1fr; }
        .about__inner { overflow: hidden; }
        .about__lead {
          margin-top: clamp(1.5rem, 4vw, 2.5rem);
          color: var(--fg);
          font-size: var(--step-1);
          line-height: 1.4;
          font-variation-settings: 'wght' 400;
        }
        .about__body {
          margin-top: 1.25rem;
          color: var(--muted);
          font-size: var(--step-0);
          line-height: 1.5;
        }
        @media (prefers-reduced-motion: reduce) {
          .about__reveal { transition: none; }
        }
      `}</style>
    </section>
  );
}
