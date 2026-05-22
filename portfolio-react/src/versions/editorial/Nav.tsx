import { useEffect, useRef, useState } from 'react';

const EMAIL = 'tom@altramanera.app';
const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide-on-scroll-down, reveal-on-scroll-up (matches the reference header).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'var(--ed-background)',
        transform: hidden ? 'translateY(-100%)' : 'none',
        transition: 'transform 450ms var(--ed-ease)',
      }}
      className="ed-nav-header"
    >
      <nav className="ed-nav">
        <a href="#top" className="ed-nav__name ed-medium">
          Tom Parandyk
        </a>

        <div className="ed-nav__links">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="ed-nav__link">
              <span className="ed-underline">{l.label}</span>
            </a>
          ))}
        </div>

        <a href={`mailto:${EMAIL}`} className="ed-nav__email ed-underline">
          {EMAIL}
        </a>
      </nav>

      <style>{`
        .ed-nav {
          max-width: var(--ed-maxw);
          margin-inline: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px;
          font-size: 14px;
          letter-spacing: -0.28px;
        }
        @media (min-width: 768px) {
          .ed-nav { padding: 24px 40px; gap: 32px; }
        }
        .ed-nav__name { font-size: 16px; white-space: nowrap; }
        .ed-nav__links { display: none; gap: 28px; }
        .ed-nav__link { color: var(--ed-foreground); }
        .ed-nav__email { color: var(--ed-grey); white-space: nowrap; }
        @media (min-width: 900px) {
          .ed-nav__links { display: flex; }
        }
        @media (max-width: 560px) {
          .ed-nav__email { display: none; }
        }
      `}</style>
    </header>
  );
}
