import type { Project } from '../../types';

export default function VideoIntro({ project }: { project: Project }) {
  return (
    <section className="container case-video">
      <div className="case-video__frame img-fallback">
        <video
          className="case-video__el"
          src={project.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <style>{`
        .case-video { padding-block: clamp(1rem, 3vw, 2rem); }
        /* Border + radius match .shot__frame so video and images read as a set. */
        .case-video__frame {
          position: relative;
          aspect-ratio: 16 / 9;
          display: grid;
          place-items: center;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: clamp(0.5rem, 1.2vw, 1rem);
        }
        .case-video__el { width: 100%; height: 100%; object-fit: cover; }
      `}</style>
    </section>
  );
}
