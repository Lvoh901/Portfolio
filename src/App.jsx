import React, { Suspense, lazy, useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';

// pages
import Navigation from './assets/Navigation';
const Footer = lazy(() => import('./pages/Footer'));
import NotFound from './pages/404';
import Loader from './assets/Loader';
import Testimonial from './assets/Testimonial';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const SinglePost = lazy(() => import('./pages/SinglePost'));
const CreatePost = lazy(() => import('./pages/CreatePost'));

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const showFooter = location.pathname !== '/';

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  // Layout component for the main page
  const MainLayout = () => (
    <>
      <Hero />
      <About />
      <Projects />
      <Testimonial />
      <Contact />
    </>
  );

  return (
    <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300'>
      <Navigation />
      <Loader isLoading={loading} />

      {!loading && (
        <React.Fragment>
          <Suspense fallback={<Loader isLoading={true} />}>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:title" element={<SinglePost />} />
              <Route path="/createpost" element={<CreatePost />} />
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
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
};

export default App;