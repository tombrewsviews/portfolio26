import { experiments } from '../content/experiments';
import Reveal from './Reveal';

export default function ExperimentsList() {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        // design engineering experiments
      </span>
      <div style={{ marginTop: '1.5rem', display: 'grid', gap: 'var(--gap)' }}>
        {experiments.map((e) => (
          <Reveal key={e.title}>
            <article style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.5rem' }}>
              <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 600 }}>{e.title}</h3>
              <p style={{ color: 'var(--muted)', maxWidth: '56ch', marginTop: '0.5rem' }}>{e.description}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                {e.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontSize: '0.85rem' }}>
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
