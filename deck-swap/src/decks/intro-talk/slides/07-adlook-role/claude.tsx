import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '07-adlook-role', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="cols-2 cols-2--text-asset">
          <div className="cols-text">
            <div className="eyebrow">My role</div>
            <h2 className="h2 maxw-24">Solo operator. Research through production deployment.</h2>
            <p className="body maxw-48">No engineering team to lean on. No design system to inherit. The trade-offs in this case were shaped by that constraint — and I&apos;ll flag where they were.</p>
          </div>
          <div className="stack">
            <div className="stack-row">Research &amp; interviews <span className="stack-row__tag">owned</span></div>
            <div className="stack-row">Product spec <span className="stack-row__tag">owned</span></div>
            <div className="stack-row">Flow &amp; UX design <span className="stack-row__tag">owned</span></div>
            <div className="stack-row">Design system &amp; tokens <span className="stack-row__tag">owned</span></div>
            <div className="stack-row">Frontend implementation <span className="stack-row__tag">owned</span></div>
            <div className="stack-row">Deployment &amp; infra (GCP VM) <span className="stack-row__tag">owned</span></div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Adlook — Internal Deal Platform</span>
        <span>07 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
