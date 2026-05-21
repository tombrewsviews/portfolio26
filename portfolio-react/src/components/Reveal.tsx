import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { REVEAL } from '../lib/flexAnim';

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const tween = gsap.from(el, {
      opacity: 0,
      y: REVEAL.y,
      duration: REVEAL.duration,
      ease: REVEAL.ease,
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
