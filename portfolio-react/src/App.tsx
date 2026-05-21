import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SmoothScroll } from './lib/smoothScroll';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
