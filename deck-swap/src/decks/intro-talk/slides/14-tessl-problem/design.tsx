import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '14-tessl-problem',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The problem</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            New primitive. <span className="coral serif-it">No mental model to lean on.</span>
          </h2>
          <div className="compare">
            <div className="compare__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="compare__head">npm package</div>
              <ul className="compare__list">
                <li>20-year-old mental model</li>
                <li>Search, README, pin a version</li>
                <li>Code, executed by your runtime</li>
                <li>Trust cost: <b>low–medium</b></li>
              </ul>
            </div>
            <div className="compare__col compare__col--accent" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="compare__head">Tessl skill</div>
              <ul className="compare__list">
                <li>No existing instinct</li>
                <li>Behavioral spec for an AI agent</li>
                <li>Executes with the agent&rsquo;s permissions, against your codebase</li>
                <li>Trust cost: <b>high — must be designed in</b></li>
              </ul>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Tessl — Package Manager for AI Skills</span>
          <span className="foot__pg"><b>14</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
