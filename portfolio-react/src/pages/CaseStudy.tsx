import { useParams } from 'react-router-dom';
import { getProject } from '../content/lookup';
import NotFound from './NotFound';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CaseHero from '../components/case/CaseHero';
import VideoIntro from '../components/case/VideoIntro';
import Overview from '../components/case/Overview';
import MetricsGrid from '../components/case/MetricsGrid';
import RoleBlock from '../components/case/RoleBlock';
import Challenges from '../components/case/Challenges';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug ?? '');
  if (!project) return <NotFound />;

  return (
    <>
      <Nav />
      <main>
        <CaseHero project={project} />
        <VideoIntro project={project} />
        <Overview project={project} />
        <MetricsGrid project={project} />
        <RoleBlock project={project} />
        <Challenges project={project} />
      </main>
      <Footer />
    </>
  );
}
