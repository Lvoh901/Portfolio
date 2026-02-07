import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// pages
import Navigation from './assets/Navigation';
const Footer = lazy(() => import('./pages/Footer'));
import NotFound from './pages/404';
import Testimonial from './assets/Testimonial';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Projects = lazy(() => import('./pages/Projects'));
const Process = lazy(() => import('./pages/Process'));
const Contact = lazy(() => import('./pages/Contact'));



const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/';

  // Layout component for the main page
  const MainLayout = () => (
    <>
      <Hero />
      <About />
      <Projects />
      <Process />
      <Testimonial />
      <Contact />
    </>
  );

  return (
    <div className='bg-white text-gray-900 transition-colors duration-300'>
      <Navigation />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/design" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {showFooter && <Footer />}
    </div>
  );
};

import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;