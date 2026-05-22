import { projects } from '../../content/projects';
import { ArrowInt, Media } from './ui';

const STRATEGY = {
  title: 'Strategy',
  desc: 'I define the foundation so the product works as a business tool, not just a screen. Scope, structure, and a clear path to action.',
  points: [
    'Define what the product must achieve',
    'Structure the story around your positioning',
    'Prioritise what matters, remove what doesn’t',
    'Guide people toward a single clear action',
  ],
};

const CRAFT = {
  title: 'Design & Build',
  desc: 'I shape how the product looks, feels, and behaves — then ship it. A cohesive system built on strategy and real code.',
  points: [
    'A visual language aligned with your goals',
    'Motion and interaction that aid understanding',
    'A design system that scales as you grow',
    'Front-end implementation that matches the spec',
  ],
};

function Pillar({ data }: { data: typeof STRATEGY }) {
  // chip list of projects this discipline touched
  const chips = projects.map((p) => p.title);
  return (
    <div className="ed-pillar">
      <h3 className="ed-subhead ed-medium">{data.title}</h3>
      <p className="ed-body-lg ed-grey" style={{ marginTop: 16, maxWidth: 480 }}>
        {data.desc}
      </p>
      <ul className="ed-pillar__points">
        {data.points.map((pt) => (
          <li key={pt} className="ed-body">
            <span className="ed-pillar__dash ed-grey">—</span>
            {pt}
          </li>
        ))}
      </ul>
      <div className="ed-pillar__chips">
        {chips.map((c) => (
          <span key={c} className="ed-mini ed-grey ed-pillar__chip ed-link-group">
            <span className="ed-underline">{c}</span>
            <ArrowInt />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="ed-section" style={{ background: 'var(--ed-muted-2)' }}>
      <div className="ed-inner">
        <h2 className="ed-heading ed-medium" style={{ marginBottom: 48 }}>
          How I work
        </h2>

        <div className="ed-services-grid">
          <Pillar data={STRATEGY} />
          <Pillar data={CRAFT} />
        </div>

        <div style={{ marginTop: 64 }}>
          <Media src="" alt="Process gallery" ratio="16 / 9" label="Process & artefacts" />
        </div>
      </div>

      <style>{`
        .ed-services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 768px) {
          .ed-services-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        .ed-pillar__points {
          list-style: none;
          margin: 28px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ed-pillar__points li { display: flex; gap: 12px; }
        .ed-pillar__dash { flex-shrink: 0; }
        .ed-pillar__chips {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
        }
        .ed-pillar__chip { display: inline-flex; align-items: center; gap: 6px; }
      `}</style>
    </section>
  );
}
