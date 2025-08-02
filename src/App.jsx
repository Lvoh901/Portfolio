import React, { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// pages
import Navigation from './assets/Navigation';
import Footer from './pages/Footer';
import NotFound from './pages/404';
import Loader from './assets/Loader';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const showFooter = location.pathname !== '/';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-gray-50'>
      <Navigation />

      <Loader isLoading={loading} />

      {!loading && (
        <React.Fragment>
          <Suspense fallback={<Loader isLoading={true} />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {showFooter && <Footer />}
        </React.Fragment>
      )}
    </div>
  );
};

const App = () => {
  // Remove duplicate loading logic from App, only use AppContent's loading
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;