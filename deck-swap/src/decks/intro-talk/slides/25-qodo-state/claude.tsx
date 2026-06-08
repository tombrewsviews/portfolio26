import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '25-qodo-state', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The core decision</div>
        <h2 className="h2 maxw-24">The hard part isn&apos;t the happy path. It&apos;s making <span className="accent">Fixing, Generating, Failed</span> legible.</h2>
        <p className="body body--lg maxw-46">Each test carries its own live state. The plan narrates what the agent is doing and why. Autonomous mode runs ahead; the operator can interrupt at any step.</p>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>25 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
