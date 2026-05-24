import { useLenis } from 'lenis/react';
import TransitionLink from '../lib/TransitionLink';
import { sectionScrollOffset } from '../lib/sectionScroll';

export default function Nav() {
  const lenis = useLenis();

  // Smooth-scroll to a section in EITHER direction. Native #hash anchors don't
  // work on a Lenis page (its virtual scroll position snaps back), so drive the
  // jump through Lenis; fall back to scrollIntoView when Lenis isn't available.
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: sectionScrollOffset(), duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <TransitionLink to="/" className="nav__name">
          Tom Parandyk
        </TransitionLink>
        <div className="nav__links">
          <a href="#about" className="nav__link" onClick={(e) => scrollToSection(e, 'about')}>[ About ]</a>
          <a href="#work" className="nav__link" onClick={(e) => scrollToSection(e, 'work')}>[ Work ]</a>
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
          cursor: pointer;
        }
        .nav__link:hover { opacity: 0.55; }
      `}</style>
    </nav>
  );
}
