import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '05-adlook-title',
  variant: 'claude',
  transition: 'fade',
  bg: 'linear-gradient(180deg, oklch(0.22 0.04 190), oklch(0.16 0.02 190))',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--section is-active">
      <div className="slide__body">
        <div className="eyebrow">Case 01</div>
        <h1 className="display">Adlook.<br /><span className="muted">Internal deal platform.</span></h1>
        <div className="body body--lg mt-7 maxw-48">Solo Product Operator · 2026 · Under NDA</div>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>05 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
