// Companies / tools Tom has worked with or built on. Two rows that scroll
// in opposite directions and pause on hover (reference interaction pattern).
const ROW_A = [
  'Adlook',
  'Tessl',
  'Koyeb',
  'Qodo',
  'Neon',
  'BNP Paribas',
  'Vercel',
  'Anthropic',
];
const ROW_B = [
  'Remotion',
  'GSAP',
  'Lenis',
  'React',
  'Figma',
  'Claude Code',
  'TypeScript',
  'Three.js',
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className={`ed-marquee__track ${reverse ? 'ed-marquee__track--reverse' : ''}`}>
      {doubled.map((name, i) => (
        <span key={i} className="ed-marquee__item" aria-hidden={i >= items.length}>
          {name}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section style={{ borderBlock: '1px solid var(--ed-border)' }}>
      <div className="ed-marquee">
        <div className="ed-marquee__fade ed-marquee__fade--l" />
        <div className="ed-marquee__fade ed-marquee__fade--r" />
        <Row items={ROW_A} />
      </div>
      <div className="ed-marquee" style={{ borderTop: '1px solid var(--ed-border)' }}>
        <div className="ed-marquee__fade ed-marquee__fade--l" />
        <div className="ed-marquee__fade ed-marquee__fade--r" />
        <Row items={ROW_B} reverse />
      </div>
    </section>
  );
}
