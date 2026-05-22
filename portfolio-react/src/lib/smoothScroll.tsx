import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenisRef.current?.lenis?.on('scroll', onScroll);

    // Recalculate trigger positions once fonts/layout settle and after full load,
    // so scroll reveals fire against correct geometry and never stick hidden.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current?.lenis?.off('scroll', onScroll);
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
