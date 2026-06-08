import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '23-qodo-problem', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The problem</div>
        <h2 className="h2">A non-deterministic agent. No stable state to show the human.</h2>
        <div className="compare">
          <div className="compare__col">
            <div className="compare__head">Deterministic tool</div>
            <ul className="compare__list">
              <li>Same input, same output</li>
              <li>One status: ran or errored</li>
              <li>User reads the result, moves on</li>
              <li>Trust cost: low</li>
            </ul>
          </div>
          <div className="compare__col">
            <div className="compare__head accent">Agentic test agent</div>
            <ul className="compare__list">
              <li>Same input can take different paths</li>
              <li>Generating · Fixing · Passed · Failed — at once</li>
              <li>Must say what it&apos;s doing, and when to step in</li>
              <li>Trust cost: high — must be designed in</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>23 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
