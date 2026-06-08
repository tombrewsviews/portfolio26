import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '30-thank-you',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.255 0.020 48)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--ink">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="close">
            <div className="close__name" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>Thank you.</div>
            <div className="close__contact" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
              <div><span>Portfolio</span><a href="https://tomparandyk.me/" target="_blank" rel="noreferrer">tomparandyk.me</a></div>
              <div><span>Email</span><a href="mailto:parandykt@gmail.com">parandykt@gmail.com</a></div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Portfolio — Guidepoint</span>
          <span className="foot__pg"><b>30</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
