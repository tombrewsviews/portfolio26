import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function MetricsGrid({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 4rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>// success metrics</span>
      <div style={{ display: 'grid', gap: 'var(--gap)', marginTop: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))' }}>
        {project.metrics.map((m, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>{m.value}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{m.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
