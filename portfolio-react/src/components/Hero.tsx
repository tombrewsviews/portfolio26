import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FlexText from './FlexText';

const HEADLINE = 'I love building while I design.';
const SUBLINE = 'Product design and design engineering — shipped, not theorized.';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Kinetic typography: per-word reveal on the headline (visible animation).
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = el.querySelectorAll<HTMLElement>('[data-word]');
    if (reduce || words.length === 0) return;

    const tween = gsap.from(words, {
      yPercent: 110,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.06,
      delay: 0.1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  // Pretext layout: measure the subline to reserve its height up front,
  // preventing layout shift when the variable font swaps in (font-display: swap).
  useEffect(() => {
    const el = subRef.current;
    if (!el) return;
    let cancelled = false;
    import('@chenglou/pretext')
      .then(({ prepare, layout }) => {
        if (cancelled || !subRef.current) return;
        const cs = getComputedStyle(el);
        const font = `${cs.fontSize} ${cs.fontFamily}`;
        const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
        const prepared = prepare(SUBLINE, font);
        const { height } = layout(prepared, el.clientWidth, lineHeight);
        if (height > 0) el.style.minHeight = `${Math.ceil(height)}px`;
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
        <span ref={headlineRef} style={{ display: 'inline-block' }}>
          {HEADLINE.split(' ').map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
              <span data-word style={{ display: 'inline-block' }}>
                {word}
              </span>
              {i < HEADLINE.split(' ').length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      </FlexText>
      <div ref={subRef} style={{ color: 'var(--muted)', maxWidth: '46ch', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
        {SUBLINE}
      </div>
    </header>
  );
}
