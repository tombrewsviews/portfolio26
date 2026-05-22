import { ArrowExt } from './ui';

const EMAIL = 'tom@altramanera.app';

export default function Cta() {
  return (
    <section id="contact" className="ed-section">
      <div className="ed-inner ed-cta">
        <h2 className="ed-hero ed-medium">Let's talk</h2>
        <p className="ed-body-lg ed-grey ed-cta__copy">
          If you're scaling a product, brand, or platform and need a clear design direction —
          and someone who can build it — I'm open to conversations.
        </p>
        <a href={`mailto:${EMAIL}`} className="ed-btn ed-btn--solid ed-link-group ed-cta__btn">
          <span>Contact me</span>
          <ArrowExt />
        </a>
      </div>

      <style>{`
        .ed-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          padding-block: clamp(40px, 8vw, 96px);
        }
        .ed-cta__copy { max-width: 620px; }
        .ed-cta__btn { margin-top: 8px; }
      `}</style>
    </section>
  );
}
