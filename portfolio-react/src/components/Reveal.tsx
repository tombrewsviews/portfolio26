import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REVEAL } from '../lib/flexAnim';

gsap.registerPlugin(ScrollTrigger);

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

    // Hide only after JS confirms it can animate — so content is never lost if JS fails.
    gsap.set(el, { opacity: 0, y: REVEAL.y });

    const show = () =>
      gsap.to(el, { opacity: 1, y: 0, duration: REVEAL.duration, ease: REVEAL.ease, delay });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: show,
    });

    // Failsafe: if for any reason the element is already in view and the trigger
    // didn't fire (geometry not yet settled), reveal it on the next frame.
    const raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) show();
    });

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      gsap.killTweensOf(el);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
