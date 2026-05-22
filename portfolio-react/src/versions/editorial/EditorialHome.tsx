import { useEffect } from 'react';
import './editorial.css';
import Nav from './Nav';
import Hero from './Hero';
import Marquee from './Marquee';
import SelectedWork from './SelectedWork';
import Services from './Services';
import About from './About';
import Writing from './Writing';
import Cta from './Cta';
import Footer from './Footer';

/**
 * Editorial version of the portfolio — a light, type-led layout that
 * reproduces the structure and interaction language of a reference
 * editorial portfolio, populated entirely with Tom Parandyk's own content.
 * Lives on /v2 alongside the dark default version.
 */
export default function EditorialHome() {
  // This version is light; force the document background so the page
  // doesn't flash the dark theme behind the scoped wrapper.
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = '#ffffff';
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  return (
    <div className="ed">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <SelectedWork />
        <Services />
        <About />
        <Writing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
