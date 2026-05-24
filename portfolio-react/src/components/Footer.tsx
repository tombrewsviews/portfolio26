import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { socials } from '../content/socials';
import { sources } from '../content/sources';
import FlexText from './FlexText';

gsap.registerPlugin(Flip);

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  // Smoothly animate the reflow between the two CTA states: when "Let's talk."
  // grows and the social links wrap to the next line (or snap back), Flip tweens
  // the links from their old geometry to the new one instead of jumping.
  useEffect(() => {
    const cta = ctaRef.current;
    const links = socialsRef.current;
    if (!cta || !links) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const isWrapped = () => links.offsetTop > cta.offsetTop + 4; // links on their own line?

    let wrapped = isWrapped();
    // ResizeObserver fires AFTER the browser has already reflowed, so we can't
    // capture the pre-change geometry on demand. Instead keep a snapshot from the
    // previous settled frame and Flip *from* it when the wrap state flips.
    let prevState = Flip.getState(links);
    let raf = 0;
    let active = false;

    const ro = new ResizeObserver(() => {
      if (active) return; // ignore the resize ticks our own animation triggers
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nowWrapped = isWrapped();
        if (nowWrapped === wrapped) {
          prevState = Flip.getState(links); // keep the snapshot current while stable
          return;
        }
        wrapped = nowWrapped;

        active = true;
        Flip.from(prevState, {
          duration: 0.65,
          ease: 'expo.out',
          absolute: true,
          onStart: () => {
            gsap.fromTo(
              links.children,
              { autoAlpha: 0.35, filter: 'blur(4px)', y: nowWrapped ? -10 : 10 },
              { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 0.55, ease: 'expo.out', stagger: 0.06 }
            );
          },
          onComplete: () => {
            active = false;
            prevState = Flip.getState(links); // re-baseline after the move
          },
        });
      });
    });

    ro.observe(cta);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <footer className="container footer">
      <div className="footer__cta" ref={ctaRef}>
        <FlexText as="h2" className="footer__big display">
          Let's talk.
        </FlexText>
        <div className="footer__socials" ref={socialsRef}>
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="footer__sources">
        <span className="kicker">Creative AI solutions used to design this site</span>
        <ul className="footer__src-list">
          {sources.map((src) => (
            <li className="footer__src" key={src.name}>
              <a href={src.href} target="_blank" rel="noopener noreferrer" className="footer__src-link">
                {src.name}
              </a>
              <span className="footer__src-note">{src.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__base">
        <span>© {new Date().getFullYear()} Tom Parandyk</span>
        <span>Built with React, GSAP &amp; RobotoFlex</span>
      </div>

      <style>{`
        .footer { padding-block: clamp(4rem, 10vw, 8rem) clamp(2rem, 4vw, 3rem); border-top: 1px solid var(--line); }
        .footer__cta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(1.5rem, 4vw, 3rem);
          padding-bottom: clamp(3rem, 8vw, 6rem);
        }
        .footer__big { font-size: var(--display); line-height: 0.9; letter-spacing: -0.04em; }
        .footer__socials { display: flex; gap: clamp(1rem, 3vw, 2rem); flex-wrap: wrap; }
        .footer__social {
          font-size: var(--step-1);
          font-variation-settings: 'wght' 440;
          color: var(--muted);
          transition: color 0.3s var(--ease-out-quart);
        }
        .footer__social:hover { color: var(--fg); }

        .footer__sources { border-top: 1px solid var(--line); padding-top: clamp(1.75rem, 4vw, 2.75rem); }
        .footer__src-list {
          list-style: none;
          margin-top: clamp(1.25rem, 3vw, 2rem);
          display: grid;
          gap: 0.6rem 2rem;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
        }
        .footer__src { display: flex; gap: 0.6rem; align-items: baseline; font-size: var(--step--1); }
        .footer__src-link { color: var(--fg); font-variation-settings: 'wght' 520; white-space: nowrap; }
        .footer__src-link:hover { text-decoration: underline; }
        .footer__src-note { color: var(--faint); }

        .footer__base {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: clamp(2.5rem, 6vw, 4rem);
          color: var(--faint);
          font-size: var(--step--1);
        }
      `}</style>
    </footer>
  );
}
