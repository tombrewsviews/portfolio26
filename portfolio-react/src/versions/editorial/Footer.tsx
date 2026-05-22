import { useState } from 'react';
import { socials } from '../../content/socials';
import { ArrowExt } from './ui';

const EMAIL = 'tom@altramanera.app';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <footer
      className="ed-footer"
      style={{ background: 'var(--ed-foreground)', color: 'var(--ed-background)' }}
    >
      <div className="ed-inner">
        <h2 className="ed-heading ed-medium ed-footer__tagline">
          Let's build something clear, fast, and worth keeping.
        </h2>

        <div className="ed-footer__cols">
          <button onClick={copyEmail} className="ed-footer__email ed-link-group">
            <span className="ed-mini ed-footer__muted">Email — click to copy</span>
            <span className="ed-body-lg">
              <span className="ed-underline">{copied ? 'Copied!' : EMAIL}</span>
            </span>
          </button>

          <div className="ed-footer__socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="ed-link-group ed-body-lg"
              >
                <span className="ed-underline">{s.label}</span>
                <ArrowExt />
              </a>
            ))}
          </div>
        </div>

        <div className="ed-footer__meta ed-mini ed-footer__muted">
          <span>{new Date().getFullYear()} © Design &amp; development by Tom Parandyk</span>
          <span>2015–2026</span>
          <span>Product · Design Systems · Front-end</span>
        </div>
      </div>

      <style>{`
        .ed-footer { padding: 64px var(--ed-pad); }
        @media (min-width: 768px) { .ed-footer { padding: 80px var(--ed-pad-lg); } }
        .ed-footer__tagline { max-width: 900px; }
        .ed-footer__muted { color: rgba(255,255,255,0.5); }
        .ed-footer__cols {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .ed-footer__cols { flex-direction: row; align-items: flex-end; }
        }
        .ed-footer__email {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
          text-align: left;
        }
        .ed-footer__socials { display: flex; flex-wrap: wrap; gap: 24px; }
        .ed-footer__meta {
          margin-top: 56px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (min-width: 768px) {
          .ed-footer__meta { flex-direction: row; align-items: center; justify-content: space-between; }
        }
      `}</style>
    </footer>
  );
}
