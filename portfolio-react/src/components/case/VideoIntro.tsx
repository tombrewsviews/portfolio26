import type { Project } from '../../types';

export default function VideoIntro({ project }: { project: Project }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(1rem, 4vw, 3rem)' }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: '#161616', display: 'grid', placeItems: 'center', border: '1px solid var(--line)' }}>
        <video
          src={project.videoSrc}
          muted
          loop
          playsInline
          controls
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.currentTarget.style.display = 'none'); }}
        />
        <span style={{ position: 'absolute', color: 'var(--muted)', fontSize: '0.85rem', pointerEvents: 'none' }}>
          ▶ video intro — coming soon
        </span>
      </div>
    </section>
  );
}
