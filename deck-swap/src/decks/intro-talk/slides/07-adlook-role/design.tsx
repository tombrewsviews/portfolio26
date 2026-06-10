import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '07-adlook-role',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="role-grid">
            <div className="problem-copy">
              <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>My role</div>
              <h2 className="h2 maxw-22" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
                Solo operator. <span className="serif-it coral">Research through production.</span>
              </h2>
              <p className="body maxw-46" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
                No engineering team to lean on. No design system to inherit. The trade-offs here were shaped by that constraint — and I&rsquo;ll flag where they were.
              </p>
            </div>
            <div className="stack">
              {[
                { n: '01', label: 'Research & interviews' },
                { n: '02', label: 'Product spec' },
                { n: '03', label: 'Flow & UX design' },
                { n: '04', label: 'Design system & tokens' },
                { n: '05', label: 'Frontend implementation' },
                { n: '06', label: 'Deployment & infra (GCP VM)' },
              ].map((row, i) => (
                <div key={row.n} className="stack-row" data-anim style={{ ['--d' as string]: 2 + i } as React.CSSProperties}>
                  <span className="stack-row__n">{row.n}</span>
                  <span>{row.label}</span>
                  <span className="stack-row__tag">owned</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Adlook — Internal Deal Platform</span>
          <span className="foot__pg"><b>07</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
