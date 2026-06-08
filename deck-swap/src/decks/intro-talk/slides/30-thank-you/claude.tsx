import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '30-thank-you', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide slide--close is-active">
      <div className="slide__body">
        <div className="close">
          <div className="close__name">Thank you.</div>
          <div className="close__contact">
            <div><span>Portfolio</span><a href="https://tomparandyk.me/" target="_blank" rel="noreferrer">tomparandyk.me</a></div>
            <div><span>Email</span><a href="mailto:parandykt@gmail.com">parandykt@gmail.com</a></div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Portfolio Presentation for Guidepoint</span>
        <span>30 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
