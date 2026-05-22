import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import { SmoothScroll } from './lib/smoothScroll';
import { PageTransition } from './lib/PageTransition';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';
import EditorialHome from './versions/editorial/EditorialHome';

/**
 * Reset scroll for navigations that DON'T go through the swipe transition —
 * i.e. browser back/forward (POP). Transition-driven navigations (PUSH) reset
 * scroll themselves while the overlay covers the screen, so we skip those here
 * to avoid a double jump.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType === 'POP') window.scrollTo(0, 0);
  }, [pathname, navType]);
  return null;
}

/**
 * The default (dark) site runs inside Lenis smooth-scroll + the swipe page
 * transition. The editorial version on /v2 is light, manages its own scroll,
 * and must NOT live under those wrappers — so it gets its own branch.
 */
function DefaultSite() {
  return (
    <SmoothScroll>
      <PageTransition>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/v2" element={<EditorialHome />} />
        <Route path="/*" element={<DefaultSite />} />
      </Routes>
    </BrowserRouter>
  );
}
