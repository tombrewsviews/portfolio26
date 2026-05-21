import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function RoleBlock({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <Reveal>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>// my role</span>
        <p style={{ maxWidth: '60ch', marginTop: '1rem', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>{project.role}</p>
      </Reveal>
    </section>
  );
}
