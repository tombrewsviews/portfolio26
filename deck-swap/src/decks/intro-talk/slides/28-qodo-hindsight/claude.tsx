import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '28-qodo-hindsight', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">What I&apos;d change in hindsight</div>
        <h2 className="h2">Design the state vocabulary <span className="accent">once</span>, not per feature.</h2>
        <div className="learnings">
          <div className="learnings__col">
            <div className="learnings__lead">What happened.</div>
            <p className="learnings__body">Each agent surface invented its own status language as it shipped. Fast, but the meaning of &ldquo;Fixing&rdquo; drifted between surfaces — and every new workflow paid the cost again.</p>
          </div>
          <div className="learnings__col">
            <div className="learnings__lead">What I do now.</div>
            <p className="learnings__body">A shared, extensible state model <span className="fg">first</span> — one set of states, escalation rules, and handoff moments that new workflow types inherit instead of reinventing.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>28 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
