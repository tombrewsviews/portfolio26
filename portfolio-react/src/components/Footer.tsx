import { socials } from '../content/socials';
import { sources } from '../content/sources';

export default function Footer() {
  return (
    <footer className="container" style={{ paddingBlock: 'clamp(3rem, 8vw, 6rem)', borderTop: '1px solid var(--line)' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: 700 }}>Let's talk.</h2>
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        {socials.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontSize: '1.1rem' }}>
            {s.label} ↗
          </a>
        ))}
      </div>

      <div style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          // creative AI solutions used to design this site
        </span>
        <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))' }}>
          {sources.map((src) => (
            <li key={src.name} style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              <a href={src.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline' }}>
                {src.name}
              </a>{' '}
              — {src.note}
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: '3rem', color: 'var(--muted)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Tom Parandyk</p>
    </footer>
  );
}
