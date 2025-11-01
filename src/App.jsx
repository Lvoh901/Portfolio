import React, { Suspense, lazy, useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';

// pages
import Navigation from './assets/Navigation';
const Footer = lazy(() => import('./pages/Footer'));
import NotFound from './pages/404';
import Loader from './assets/Loader';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const SinglePost = lazy(() => import('./pages/SinglePost'));

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const showFooter = location.pathname !== '/';

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300'>
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<SinglePost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {showFooter && <Footer />}
        </React.Fragment>
      )}
    </div>
  );
};

import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  // Remove duplicate loading logic from App, only use AppContent's loading
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
};

export default App;