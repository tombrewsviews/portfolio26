import type { SlideMeta, SlideProps } from '@/lib/types';
import { DemoFrame } from '@/lib/ui/DemoFrame';

export const meta: SlideMeta = { id: '12-adlook-demo', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">Live demo</div>
        <h2 className="h2">Create &rarr; Assemble &rarr; Validate &rarr; Approve &rarr; Track.</h2>
        <DemoFrame label="Switching to live system" sub="Anonymized data · interrupt anytime" />
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>12 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
