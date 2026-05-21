import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import FlexText from '../FlexText';

export default function CaseHero({ project }: { project: Project }) {
  return (
    <header className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)' }}>
      <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'underline', fontSize: '0.85rem' }}>← back</Link>
      <div style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2rem' }}>
        PROJECT [{project.projectNumber}] · {project.year}
      </div>
      <FlexText as="h1" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', lineHeight: 1.02, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
        {project.title}
      </FlexText>
      <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginTop: '0.5rem' }}>{project.subtitle}</p>
    </header>
  );
}
