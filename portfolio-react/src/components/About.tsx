import { useState } from 'react';

export default function About() {
  const [open, setOpen] = useState(false);
  return (
    <section id="about" className="container" style={{ paddingBlock: 'clamp(2rem, 6vw, 5rem)', borderTop: '1px solid var(--line)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
          fontSize: 'clamp(1.25rem, 4vw, 2.25rem)', fontWeight: 600, display: 'flex', gap: '0.75rem', alignItems: 'baseline',
        }}
      >
        <span style={{ color: 'var(--muted)' }}>[{open ? '–' : '+'}]</span>
        A bit more about me
      </button>
      {open && (
        <p style={{ marginTop: '1.5rem', maxWidth: '60ch', color: 'var(--muted)', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
          I'm a founding designer and full-stack builder. I design products and build the things I design —
          shipping every week, learning in public, and treating AI as a collaborator rather than a shortcut.
        </p>
      )}
    </section>
  );
}
