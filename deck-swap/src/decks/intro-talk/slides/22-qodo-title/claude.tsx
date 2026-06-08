import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '22-qodo-title',
  variant: 'claude',
  transition: 'fade',
  bg: 'linear-gradient(180deg, oklch(0.22 0.04 280), oklch(0.16 0.02 280))',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--section is-active">
      <div className="slide__body">
        <div className="eyebrow">Case 03</div>
        <h1 className="display">Qodo.<br /><span className="muted">AI code generation in the developer&rsquo;s terminal.</span></h1>
        <div className="body body--lg mt-7 maxw-52">Founding Product Designer / Design Engineer · 2022–2025</div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>22 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
