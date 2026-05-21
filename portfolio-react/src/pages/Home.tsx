import Nav from '../components/Nav';
import Hero from '../components/Hero';
import CreativeBanner from '../components/CreativeBanner';
import About from '../components/About';
import WorkList from '../components/WorkList';
import ExperimentsList from '../components/ExperimentsList';
import WhatShapedMe from '../components/WhatShapedMe';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CreativeBanner />
        <About />
        <WorkList />
        <ExperimentsList />
        <WhatShapedMe />
      </main>
      <Footer />
    </>
  );
}
