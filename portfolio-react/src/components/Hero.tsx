import { useEffect, useRef } from 'react';
import FlexText from './FlexText';

export default function Hero() {
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !subRef.current) return;
    // Progressive enhancement: apply pretext kinetic type if available.
    import('@chenglou/pretext')
      .then((mod) => {
        if (cancelled || !subRef.current) return;
        const run = (mod as any).default ?? (mod as any).pretext;
        if (typeof run === 'function') run(subRef.current);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header
      className="container"
      style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}
    >
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        // founding designer &amp; full-stack builder
      </span>
      <FlexText
        as="h1"
        style={{
          fontSize: 'clamp(2.5rem, 9vw, 7rem)',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          maxWidth: '14ch',
        }}
      >
        I love building while I design.
      </FlexText>
      <div ref={subRef} style={{ color: 'var(--muted)', maxWidth: '46ch', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
        Product design and design engineering — shipped, not theorized.
      </div>
    </header>
  );
}
