import { useParams } from 'react-router-dom';
import { getProject, getNextProject } from '../content/lookup';
import NotFound from './NotFound';
import Footer from '../components/Footer';
import CaseHero from '../components/case/CaseHero';
import VideoIntro from '../components/case/VideoIntro';
import Overview from '../components/case/Overview';
import MetricsGrid from '../components/case/MetricsGrid';
import RoleBlock from '../components/case/RoleBlock';
import Challenges from '../components/case/Challenges';
import CaseShots from '../components/case/CaseShots';
import NextCase from '../components/case/NextCase';
import type { Project } from '../types';

/**
 * Slots where a screenshot may drop in, keyed by the section it follows.
 * The page walks the sections in order; at each slot it pulls the next
 * shot whose target slot matches. Per-project slot maps make placement
 * vary case-to-case so it's never predictable which gap holds an image —
 * but every shot still aligns to the shared grid in CaseShots.
 */
type Slot = 'after-video' | 'after-overview' | 'after-metrics' | 'after-role' | 'after-challenges';

const SLOT_ORDER: Slot[] = [
  'after-video',
  'after-overview',
  'after-metrics',
  'after-role',
  'after-challenges',
];

/**
 * Per-project: which slot each shot (in `project.shots` order) lands in.
 * Different distributions per slug = different rhythm per case study.
 */
const SHOT_SLOTS: Record<string, Slot[]> = {
  adlook: ['after-video', 'after-metrics', 'after-role', 'after-challenges'],
  tessl: ['after-overview', 'after-metrics', 'after-role', 'after-challenges'],
  koyeb: ['after-video', 'after-overview', 'after-metrics', 'after-challenges'],
  qodo: ['after-overview', 'after-metrics', 'after-role', 'after-challenges'],
  neon: ['after-video', 'after-overview', 'after-role', 'after-challenges'],
  'bnp-paribas': ['after-overview', 'after-metrics', 'after-role', 'after-challenges'],
};

function shotsForSlot(project: Project, slot: Slot) {
  const slots = SHOT_SLOTS[project.slug] ?? SLOT_ORDER;
  return (project.shots ?? [])
    .map((shot, i) => ({ shot, slot: slots[i] }))
    .filter((s) => s.slot === slot)
    .map(({ shot }, i) => <CaseShots key={`${slot}-${i}`} shot={shot} />);
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug ?? '');
  if (!project) return <NotFound />;
  const next = getNextProject(project.slug);

  return (
    <>
      <main className="case-main">
        <CaseHero project={project} />
        {project.videoSrc && <VideoIntro project={project} />}
        <Overview project={project} />
        {shotsForSlot(project, 'after-video')}
        {shotsForSlot(project, 'after-overview')}
        <MetricsGrid project={project} />
        {shotsForSlot(project, 'after-metrics')}
        <RoleBlock project={project} />
        {shotsForSlot(project, 'after-role')}
        <Challenges project={project} />
        {shotsForSlot(project, 'after-challenges')}
      </main>
      {next && next.slug !== project.slug && <NextCase project={next} />}
      <Footer />
    </>
  );
}
