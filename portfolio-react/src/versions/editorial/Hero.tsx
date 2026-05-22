import { ArrowExt } from './ui';

export default function Hero() {
  return (
    <section
      id="top"
      className="ed-section"
      style={{ minHeight: '78vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="ed-inner" style={{ width: '100%' }}>
        <h1 className="ed-hero ed-medium ed-hero-head">
          Design that ships
          <br />
          and earns its keep.
        </h1>

        <p
          className="ed-body-lg ed-grey"
          style={{ maxWidth: 700, marginTop: 'clamp(24px, 4vw, 40px)' }}
        >
          I'm a founding designer and full-stack builder. I help teams turn strategy into
          high-performing products, design systems, and interfaces — then build them.
        </p>

        <div className="ed-hero-cta">
          <a href="#work" className="ed-btn ed-btn--solid ed-link-group">
            <span>Selected Work</span>
            <ArrowExt />
          </a>
          <a href="#about" className="ed-btn ed-btn--ghost ed-link-group">
            <span>Me &amp; My Process</span>
            <ArrowExt />
          </a>
        </div>
      </div>

      <style>{`
        .ed-hero-head { max-width: 1100px; }
        .ed-hero-cta {
          margin-top: clamp(32px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: stretch;
        }
        .ed-hero-cta .ed-btn { width: 100%; }
        @media (min-width: 560px) {
          .ed-hero-cta { flex-direction: row; align-items: center; }
          .ed-hero-cta .ed-btn { width: auto; }
        }
      `}</style>
    </section>
  );
}
