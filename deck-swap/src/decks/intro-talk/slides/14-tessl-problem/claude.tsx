import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '14-tessl-problem', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The problem</div>
        <h2 className="h2">New primitive. No mental model to lean on.</h2>
        <div className="compare">
          <div className="compare__col">
            <div className="compare__head">npm package</div>
            <ul className="compare__list">
              <li>20-year-old mental model</li>
              <li>Search, README, pin a version</li>
              <li>Code, executed by your runtime</li>
              <li>Trust cost: low–medium</li>
            </ul>
          </div>
          <div className="compare__col">
            <div className="compare__head accent">Tessl skill</div>
            <ul className="compare__list">
              <li>No existing instinct</li>
              <li>Behavioral spec for an AI agent</li>
              <li>Executes with the agent&apos;s permissions, against your codebase</li>
              <li>Trust cost: high — must be designed in</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>14 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
