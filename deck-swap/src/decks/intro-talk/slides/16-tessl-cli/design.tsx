import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '16-tessl-cli',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The CLI decision</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Spec-driven development doesn&rsquo;t need a UI. <span className="coral serif-it">It needs a terminal.</span>
          </h2>
          <div className="paths">
            <div className="path" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="path__label">Original path</div>
              <div className="path__title">UI-first composer</div>
              <p className="path__detail">Visual canvas to author skill specs. Technically polished. Full SDD with TDD. Still — in every developer session we dropped into a terminal or Cursor within minutes.</p>
            </div>
            <div className="path path--win" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="path__label">Driven call</div>
              <div className="path__title">CLI-first, web for trust</div>
              <p className="path__detail">
                CLI for authoring &amp; install. Web for discovery, scores, and verdict. Try-rate <span className="coral">~18% → ~70%</span> in one week with five customers.
              </p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>16</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
