import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Navigation from './assets/Navigation';
import Hero from './pages/Hero';
import Projects from './pages/Projects';
import ServicePack from './assets/ServicePack';
import About from './pages/About';
import Process from './pages/Process';
import Testimonial from './assets/Testimonial';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import Gallery from './pages/Gallery';
import NotFound from './pages/404';
import { ContentProvider } from './contexts/ContentContext';

// keep the public bundle light — the dashboard carries auth and realtime
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // let the target section mount before scrolling to it
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const Home = () => (
  <>
    <Hero />
    <Projects />
    <ServicePack />
    <About />
    <Process />
    <Testimonial />
    <Contact />
  </>
);

const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-paper text-ink">
    <Navigation />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

const Shell = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isDashboard) {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-paper text-sm text-muted">
            Loading dashboard…
          </div>
        }
      >
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Suspense>
    );
  }

  return <PublicLayout />;
};

const App = () => (
  <Router>
    <ContentProvider>
      <ScrollManager />
      <Shell />
    </ContentProvider>
  </Router>
);

export default App;
