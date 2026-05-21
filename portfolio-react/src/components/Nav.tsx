import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBlock: '1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        backdropFilter: 'blur(8px)',
        mixBlendMode: 'difference',
      }}
    >
      <Link to="/" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
        Tom Parandyk
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        <a href="#about">About</a>
        <a href="#work">Work</a>
      </div>
    </nav>
  );
}
