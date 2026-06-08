import type { SlideMeta, SlideProps } from '@/lib/types';
import { DemoFrame } from '@/lib/ui/DemoFrame';

export const meta: SlideMeta = { id: '21-tessl-demo', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Live demo</div>
        <h2 className="h2">Browse &rarr; Skill detail &rarr; Install &rarr; CLI side-by-side</h2>
        <DemoFrame label="Switching to registry.tessl.io" sub="Web + terminal · interrupt anytime" />
      </div>
      <footer className="slide__footer">
        <span>Tessl — Package manager for AI skills</span>
        <span>21 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
