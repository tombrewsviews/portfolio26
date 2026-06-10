import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '04-common-thread', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">The common thread</div>
        <h2 className="h2"><span className="accent">Trust as a design primitive</span><br />in technical and operational tooling.</h2>
        <div className="thread">
          <div className="thread__col">
            <div className="thread__project">Adlook</div>
            <p className="thread__insight">Deal operators didn&apos;t trust the system to tell them when something was wrong — so they verified every field by hand.</p>
          </div>
          <div className="thread__col">
            <div className="thread__project">Tessl</div>
            <p className="thread__insight">Developers couldn&apos;t tell whether a skill was safe to install — so they abandoned the install flow.</p>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Portfolio Presentation for Guidepoint</span>
        <span>04 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
