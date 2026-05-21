import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import FlexText from './FlexText';
import Reveal from './Reveal';

export default function WorkList() {
  return (
    <section id="work" className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        // selected work
      </span>
      <ul style={{ listStyle: 'none', marginTop: '1.5rem' }}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Reveal>
              <Link
                to={`/work/${p.slug}`}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem',
                  padding: 'clamp(1rem, 3vw, 2rem) 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap',
                }}
              >
                <FlexText as="span" style={{ fontSize: 'clamp(1.75rem, 6vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {p.title}
                </FlexText>
                <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {p.disciplines.join(' / ')} · {p.year}
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
