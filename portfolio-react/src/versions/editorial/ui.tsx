import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Diagonal arrow (↗) for external links — rotates flat on hover. */
export function ArrowExt({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ed-arrow ed-arrow--ext ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Right arrow (→) for internal links — tilts up on hover. */
export function ArrowInt({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ed-arrow ed-arrow--int ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type LinkProps = { children: ReactNode; className?: string };

/** External text link with animated underline + rotating ↗. */
export function ExtLink({ href, children, className = '' }: LinkProps & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`ed-link-group ${className}`}>
      <span className="ed-underline">{children}</span>
      <ArrowExt />
    </a>
  );
}

/** Internal router link with animated underline + rotating →. */
export function IntLink({ to, children, className = '' }: LinkProps & { to: string }) {
  return (
    <Link to={to} className={`ed-link-group ${className}`}>
      <span className="ed-underline">{children}</span>
      <ArrowInt />
    </Link>
  );
}

/** Image that crossfades in once loaded; striped placeholder until then / on error. */
export function Media({
  src,
  alt,
  ratio,
  label,
}: {
  src?: string;
  alt: string;
  ratio: string;
  label?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <div className="ed-media" style={{ aspectRatio: ratio }}>
      {showImg && (
        <img
          className="ed-media__img"
          src={src}
          alt={alt}
          loading="lazy"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 600ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)' }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {(!showImg || !loaded) && <span className="ed-placeholder">{label ?? alt}</span>}
    </div>
  );
}

/** Wraps children and fades/slides them in when scrolled into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'header' | 'footer';
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`ed-reveal ${className}`}>
      {children}
    </Tag>
  );
}
