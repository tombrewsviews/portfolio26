import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '20-tessl-hindsight', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">What I&apos;d change in hindsight</div>
        <h2 className="h2">Run the disconfirming study <span className="accent">before</span> the sprint, not after.</h2>
        <div className="learnings">
          <div className="learnings__col">
            <div className="learnings__lead">What happened.</div>
            <p className="learnings__body">Ran the CLI session study six weeks too late. The data was sitting there earlier; momentum on the existing UI carried us past it.</p>
          </div>
          <div className="learnings__col">
            <div className="learnings__lead">What I do now.</div>
            <p className="learnings__body">A disconfirming user study sits <span className="fg">before</span> every major sprint — not after. Doesn&apos;t eliminate the trap, but it shortens the lag.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>20 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
