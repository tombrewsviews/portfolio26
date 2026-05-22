import { socials } from '../../content/socials';
import { ArrowExt, ExtLink, IntLink, Media } from './ui';

export default function About() {
  return (
    <section id="about" className="ed-section">
      <div className="ed-inner ed-about">
        <div className="ed-about__media">
          <Media src="/media/tom-portrait.jpg" alt="Tom Parandyk" ratio="680 / 850" label="Portrait" />
        </div>

        <div className="ed-about__body">
          <h2 className="ed-heading ed-medium">About me</h2>
          <p className="ed-body-lg" style={{ marginTop: 24, maxWidth: 560 }}>
            I work with founders and teams who've outgrown scattered design decisions and need
            structure, direction, and consistency across brand, web, and product.
          </p>
          <p className="ed-body-lg ed-grey" style={{ marginTop: 20, maxWidth: 560 }}>
            Design isn't decoration. It's a tool for reducing friction, building trust, and guiding
            people to act — and I build it as well as draw it.
          </p>

          <div className="ed-about__socials">
            {socials.map((s) => (
              <ExtLink key={s.label} href={s.href} className="ed-body-lg">
                {s.label}
              </ExtLink>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <a href="#contact" className="ed-btn ed-btn--solid ed-link-group">
              <span>More About Me</span>
              <ArrowExt />
            </a>
          </div>

          <div style={{ marginTop: 24 }}>
            <IntLink to="/work" className="ed-body ed-grey">
              See full work archive
            </IntLink>
          </div>
        </div>
      </div>

      <style>{`
        .ed-about {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 768px) {
          .ed-about { grid-template-columns: minmax(0, 480px) 1fr; gap: 64px; }
        }
        .ed-about__socials {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }
      `}</style>
    </section>
  );
}
