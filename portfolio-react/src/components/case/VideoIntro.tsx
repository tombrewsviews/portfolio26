import type { Project } from '../../types';

export default function VideoIntro({ project }: { project: Project }) {
  return (
    <section className="container case-video">
      <div className="case-video__frame img-fallback">
        <video
          className="case-video__el"
          src={project.videoSrc}
          muted
          loop
          playsInline
          controls
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span className="case-video__label">▶ &nbsp;Video intro · coming soon</span>
      </div>

      <style>{`
        .case-video { padding-block: clamp(1rem, 3vw, 2rem); }
        .case-video__frame {
          position: relative;
          aspect-ratio: 16 / 9;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .case-video__el { width: 100%; height: 100%; object-fit: cover; }
        .case-video__label {
          position: absolute;
          color: var(--muted);
          font-size: var(--step-0);
          letter-spacing: 0.04em;
          pointer-events: none;
          font-variation-settings: 'wght' 420;
        }
      `}</style>
    </section>
  );
}
