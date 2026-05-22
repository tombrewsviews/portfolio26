import TransitionLink from '../lib/TransitionLink';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <TransitionLink to="/" className="nav__name">
          Tom Parandyk
        </TransitionLink>
        <div className="nav__links">
          <a href="#about" className="nav__link">[ About ]</a>
          <a href="#work" className="nav__link">[ Work ↓ ]</a>
        </div>
      </div>

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          mix-blend-mode: difference;
        }
        .nav__inner {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-block: clamp(1rem, 2vw, 1.6rem);
        }
        .nav__name {
          font-size: var(--step-0);
          font-variation-settings: 'wght' 650;
          letter-spacing: -0.01em;
        }
        .nav__links { display: flex; gap: clamp(0.75rem, 2vw, 1.5rem); }
        .nav__link {
          font-size: var(--step--1);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--fg);
          font-variation-settings: 'wght' 500;
          transition: opacity 0.3s var(--ease-out-quart);
        }
        .nav__link:hover { opacity: 0.55; }
      `}</style>
    </nav>
  );
}
