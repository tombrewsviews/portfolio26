import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '16-tessl-cli', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The CLI decision</div>
        <h2 className="h2">Spec-driven development doesn&apos;t need a UI. <span className="accent">It needs a terminal.</span></h2>
        <div className="paths">
          <div className="path">
            <div className="path__label">Original path</div>
            <div className="path__title">UI-first composer</div>
            <p className="path__detail">Visual canvas to author skill specs. Technically polished. Full SDD with TDD. Still in every developer session we dropped into a terminal or Cursor within a few minutes.</p>
          </div>
          <div className="path path--win">
            <div className="path__label">Driven call</div>
            <div className="path__title">CLI-first, web for trust</div>
            <p className="path__detail">CLI for authoring &amp; install. Web for discovery, scores, and verdict. Try-rate <span className="accent">~18% → ~70%</span> in one week with five customers.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>16 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
