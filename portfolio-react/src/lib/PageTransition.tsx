import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionScrollOffset } from './sectionScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-page swipe transition between routes.
 *
 * A fixed overlay panel rises from the bottom to cover the screen; while it's
 * hiding everything the route swaps and scroll resets to the top; then the same
 * panel continues up and off the top edge to reveal the new page. One continuous
 * upward motion. The incoming page's own Reveal/ScrollTrigger sections handle the
 * content entrance, so navigation never needs the caller to manage scroll.
 *
 * Consume via the `useTransition()` hook and call `transitionTo(path)` instead of
 * navigating directly (e.g. swap <Link> for <TransitionLink>).
 */

type TransitionFn = (path: string) => void;

const TransitionContext = createContext<TransitionFn | null>(null);

/** Cover phase: panel travels from below the screen (100%) to fully covering (0%). */
const COVER_DURATION = 0.55;
/** Reveal phase: panel travels from covering (0%) up and off the top (-100%). */
const REVEAL_DURATION = 0.6;
/** Brief hold while the route swaps behind the fully-covering panel. */
const HOLD = 0.05;

/**
 * Refresh ScrollTrigger once the remounted page has committed to the DOM, so
 * the new page's reveals measure against correct geometry. Two RAFs let React
 * paint the new tree; a follow-up timeout catches late layout shifts (images,
 * fonts) the way SmoothScroll does on first load.
 */
function refreshSoon() {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => ScrollTrigger.refresh()),
  );
  setTimeout(() => ScrollTrigger.refresh(), 400);
}

export function PageTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  /**
   * Position the new page instantly behind the cover panel. With no `hash` this
   * jumps to the top; with a `#section` hash it lands on that section (e.g. the
   * "← All work" link returns to the same Selected Work position every time).
   *
   * This site drives scrolling through Lenis, whose virtual position ignores a
   * bare window.scrollTo (it snaps back on the next frame), so drive Lenis
   * directly; fall back to the window for the reduced-motion / no-Lenis path.
   *
   * The hashed element only exists after the new route paints, and its offset
   * depends on pinned-section spacers (e.g. the pinned CreativeBanner above
   * #work). So before measuring we refresh ScrollTrigger to lay in those
   * spacers, then scroll — and repeat once after a beat to catch late layout
   * (fonts/images) so the landing point stays exact.
   */
  const positionScroll = useCallback(
    (hash?: string) => {
      const toTarget = () => {
        const el = hash ? document.querySelector<HTMLElement>(hash) : null;
        if (el) {
          if (lenis) lenis.scrollTo(el, { immediate: true, force: true, offset: sectionScrollOffset() });
          else el.scrollIntoView({ block: 'start' });
          return;
        }
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);
      };

      if (!hash) {
        toTarget();
        return;
      }

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          toTarget();
          // Pin spacers / fonts can settle a frame late; re-land to stay exact.
          setTimeout(() => {
            ScrollTrigger.refresh();
            toTarget();
          }, 420);
        }),
      );
    },
    [lenis],
  );
  // Forces the new page to remount so its Reveal sections re-arm and re-fire.
  const [animateKey, setAnimateKey] = useState(0);

  const transitionTo = useCallback<TransitionFn>(
    (path) => {
      const panel = panelRef.current;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Split an optional "#section" target off the path so we can land the new
      // page on that section instead of the top.
      const hashIndex = path.indexOf('#');
      const route = hashIndex >= 0 ? path.slice(0, hashIndex) || '/' : path;
      const hash = hashIndex >= 0 ? path.slice(hashIndex) : undefined;

      // No panel or reduced motion: navigate plainly, position scroll, remount.
      if (!panel || reduce) {
        navigate(route);
        setAnimateKey((k) => k + 1);
        positionScroll(hash);
        refreshSoon();
        return;
      }

      // Guard against double-clicks mid-transition.
      if (animating.current) return;
      animating.current = true;

      gsap.set(panel, { display: 'block', yPercent: 100 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(panel, { display: 'none' });
          animating.current = false;
        },
      });

      // Cover: rise from bottom to fully cover.
      tl.to(panel, {
        yPercent: 0,
        duration: COVER_DURATION,
        ease: 'power3.inOut',
      });

      // Behind the cover: swap route, position scroll, remount the page.
      tl.add(() => {
        navigate(route);
        setAnimateKey((k) => k + 1);
        positionScroll(hash);
        refreshSoon();
      });

      // Continue up and off the top to reveal the new page.
      tl.to(panel, {
        yPercent: -100,
        duration: REVEAL_DURATION,
        ease: 'power3.inOut',
        delay: HOLD,
      });
    },
    [navigate, positionScroll],
  );

  return (
    <TransitionContext.Provider value={transitionTo}>
      {/* key remounts the tree post-swap so scroll reveals re-fire on entry */}
      <div key={animateKey} style={{ display: 'contents' }}>
        {children}
      </div>

      <div ref={panelRef} className="page-transition" aria-hidden="true" />

      <style>{`
        .page-transition {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: none;
          background: var(--accent);
          pointer-events: none;
          will-change: transform;
        }
      `}</style>
    </TransitionContext.Provider>
  );
}

export function useTransition(): TransitionFn {
  const fn = useContext(TransitionContext);
  if (!fn) throw new Error('useTransition must be used within <PageTransition>');
  return fn;
}
