import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = {
  id: '24-qodo-role',
  variant: 'design',
  transition: 'fade',
  bg: 'oklch(0.968 0.012 78)',
};

export default function Slide(_: SlideProps) {
  return (
    <section className="slide">
      <div className="slide-inner">
        <div className="slide-body">
          <div className="eyebrow" data-anim style={{ ['--d' as string]: 0 } as React.CSSProperties}>My role</div>
          <h2 className="h2" data-anim style={{ ['--d' as string]: 1 } as React.CSSProperties}>
            Solo designer across every surface. <span className="coral serif-it">And a design engineer in the production codebase.</span>
          </h2>
          <div className="timeline">
            <div className="tl-step" data-anim style={{ ['--d' as string]: 2 } as React.CSSProperties}>
              <div className="tl-when">Start</div>
              <div className="tl-what">Joined as founding product designer. Agents first designed in the terminal — before Claude Code existed.</div>
            </div>
            <div className="tl-step" data-anim style={{ ['--d' as string]: 3 } as React.CSSProperties}>
              <div className="tl-when">Year 1</div>
              <div className="tl-what">Zero → 300K installs. Review surface, then the PR-agent.</div>
            </div>
            <div className="tl-step" data-anim style={{ ['--d' as string]: 4 } as React.CSSProperties}>
              <div className="tl-when">Scale</div>
              <div className="tl-what">Test-agent &amp; behavior coverage. AI research and model fine-tuning alongside design.</div>
            </div>
            <div className="tl-step tl-step--end" data-anim style={{ ['--d' as string]: 5 } as React.CSSProperties}>
              <div className="tl-when">Enterprise</div>
              <div className="tl-what">On-prem deployment + admin surfaces inside customer-controlled environments.</div>
            </div>
          </div>
        </div>
        <footer className="foot">
          <span>Qodo — AI Code Generation</span>
          <span className="foot__pg"><b>24</b> / 30</span>
          <span>Tom Parandyk</span>
        </footer>
      </div>
    </section>
  );
}
