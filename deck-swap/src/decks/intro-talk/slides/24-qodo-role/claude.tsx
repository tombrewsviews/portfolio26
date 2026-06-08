import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '24-qodo-role', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <section className="slide is-active">
      <div className="slide__body">
        <div className="eyebrow">My role</div>
        <h2 className="h2">Solo designer across every surface. <span className="accent">And a design engineer in the production codebase.</span></h2>
        <div className="timeline">
          <div className="timeline__step">
            <div className="timeline__when">Start</div>
            <div className="timeline__what">Founding product designer. Agents first designed in the terminal — before Claude Code existed.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Year 1</div>
            <div className="timeline__what">Zero → 300K installs. Review surface, then the PR-agent.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Scale</div>
            <div className="timeline__what">Test-agent &amp; behavior coverage. AI research and model fine-tuning alongside design.</div>
          </div>
          <div className="timeline__step">
            <div className="timeline__when">Enterprise</div>
            <div className="timeline__what">On-prem deployment + admin surfaces in customer-controlled environments.</div>
          </div>
        </div>
      </div>
      <footer className="slide__footer">
        <span>Qodo — AI Code Generation</span>
        <span>24 / 30</span>
        <span>Tom Parandyk</span>
      </footer>
    </section>
  );
}
