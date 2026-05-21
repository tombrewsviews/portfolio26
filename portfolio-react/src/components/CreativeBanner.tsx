import { creative } from '../content/creative';

export default function CreativeBanner() {
  const items = [...creative, ...creative];
  return (
    <section aria-label="Creative work" style={{ overflow: 'hidden', paddingBlock: 'clamp(2rem, 6vw, 5rem)' }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; gap: var(--gap); width: max-content; animation: marquee 40s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-wrap { overflow-x: auto; }
          .marquee-track { animation: none; }
        }
      `}</style>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {items.map((c, i) => (
            <figure key={i} style={{ width: 'clamp(220px, 30vw, 420px)', flex: '0 0 auto' }}>
              <img
                src={c.src}
                alt={c.caption}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', background: '#161616' }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
