import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '04-common-thread',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>The common thread</div>
          <h2 className="h2 maxw-24" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            <span className="coral serif-it">Trust</span> as a design primitive — in technical and operational tooling.
          </h2>
          <div className="duo">
            <div className="duo__col" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="duo__tag"><b>Adlook</b></div>
              <p className="duo__body">Deal operators didn&rsquo;t trust the system to tell them when something was wrong — so they <b>verified every field by hand.</b></p>
            </div>
            <div className="duo__col" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="duo__tag"><b>Tessl</b></div>
              <p className="duo__body">Developers couldn&rsquo;t tell whether a skill was safe to install — so they <b>abandoned the install flow.</b></p>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Portfolio — Guidepoint</span>
          <span className="foot__pg"><b>04</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
