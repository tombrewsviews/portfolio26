import { shaped } from '../content/shaped';
import Reveal from './Reveal';

const LABELS: Record<string, string> = {
  '// creative_practice': 'Creative practice',
  '// athletic_disciplines': 'Athletic disciplines',
  '// foundation': 'Foundation',
};

export default function WhatShapedMe() {
  return (
    <section className="container section shaped">
      <Reveal>
        <h2 className="shaped__title display">What shaped me</h2>
      </Reveal>

      <div className="shaped__grid">
        {shaped.map((group, gi) => (
          <Reveal key={group.key} delay={gi * 0.06}>
            <div className="shaped__group">
              <span className="kicker">{LABELS[group.key] ?? group.key}</span>
              <ul className="shaped__list">
                {group.items.map((item) => (
                  <li className="shaped__item" key={item.name}>
                    <span className="shaped__name">{item.name}</span>
                    <span className="shaped__note">{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        .shaped__title { margin-bottom: clamp(2.5rem, 7vw, 5rem); }
        .shaped__grid {
          display: grid;
          gap: clamp(2.5rem, 5vw, 4.5rem);
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
        }
        .shaped__group { border-top: 1px solid var(--line); padding-top: clamp(1.25rem, 3vw, 2rem); }
        .shaped__list { list-style: none; margin-top: clamp(1.25rem, 3vw, 2rem); display: grid; gap: clamp(1rem, 2.5vw, 1.5rem); }
        .shaped__item { display: flex; flex-direction: column; gap: 0.2rem; }
        .shaped__name { font-size: var(--step-1); font-variation-settings: 'wght' 520; letter-spacing: -0.01em; }
        .shaped__note { color: var(--muted); font-size: var(--step--1); letter-spacing: 0.01em; }
      `}</style>
    </section>
  );
}
