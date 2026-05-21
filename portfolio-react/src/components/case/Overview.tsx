import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function Overview({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <div style={{ display: 'grid', gap: 'var(--gap)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))' }}>
          <div><span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</span><div>{project.overview.date}</div></div>
          <div><span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Categories</span><div>{project.overview.categories.join(', ')}</div></div>
          <div style={{ gridColumn: '1 / -1' }}><span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>About</span><p style={{ maxWidth: '60ch', marginTop: '0.5rem' }}>{project.about}</p></div>
        </div>
      </Reveal>
    </section>
  );
}
