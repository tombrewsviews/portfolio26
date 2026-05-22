import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import FlexText from '../FlexText';

export default function CaseHero({ project }: { project: Project }) {
  return (
    <header className="container case-hero">
      <Link to="/" className="case-hero__back">← All work</Link>

      <div className="case-hero__meta">
        <span>Project [{project.projectNumber}]</span>
        <span>{project.year}</span>
      </div>

      <FlexText as="h1" className="case-hero__title display">
        {project.title}
      </FlexText>
      <p className="case-hero__sub">{project.subtitle}</p>

      <style>{`
        .case-hero { padding-block: clamp(5rem, 11vw, 9rem) clamp(2rem, 5vw, 4rem); }
        .case-hero__back {
          color: var(--muted);
          font-size: var(--step--1);
          letter-spacing: 0.04em;
          transition: color 0.3s var(--ease-out-quart);
        }
        .case-hero__back:hover { color: var(--fg); }
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
        }
        .case-hero__sub {
          margin-top: clamp(0.75rem, 2vw, 1.25rem);
          color: var(--muted);
          font-size: var(--step-1);
          font-variation-settings: 'wght' 380;
        }
      `}</style>
    </header>
  );
}
