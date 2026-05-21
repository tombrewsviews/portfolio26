import { shaped } from '../content/shaped';
import Reveal from './Reveal';

export default function WhatShapedMe() {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '2rem' }}>What shaped me?</h2>
      <div style={{ display: 'grid', gap: 'clamp(2rem, 5vw, 4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))' }}>
        {shaped.map((group) => (
          <Reveal key={group.key}>
            <div>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>{group.key}</span>
              <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{item.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
