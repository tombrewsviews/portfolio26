import type { Project } from '../../types';
import Reveal from '../Reveal';

export default function RoleBlock({ project }: { project: Project }) {
  return (
    <section className="container case-sec">
      <Reveal>
        <div className="case-sec__row">
          <span className="case-sec__label kicker">My role</span>
          <p className="role__body measure">{project.role}</p>
        </div>
      </Reveal>

      <style>{`
        .role__body {
          font-size: var(--step-1);
          line-height: 1.4;
          font-variation-settings: 'wght' 400;
        }
      `}</style>
    </section>
  );
}
