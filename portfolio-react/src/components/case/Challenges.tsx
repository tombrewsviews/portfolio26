import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function Challenges({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>// challenges</span>
      <div style={{ marginTop: '1.5rem', display: 'grid', gap: 'var(--gap)' }}>
        {project.challenges.map((c, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ maxWidth: '60ch' }}>
              <h3 style={{ fontWeight: 600, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>{c.heading}</h3>
              <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
