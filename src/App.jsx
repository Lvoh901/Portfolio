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
  const showFooter = location.pathname !== '/';

  return (
    <div className='bg-gray-50'>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<Hero />} />;
          <Route path="/about" exact element={<About />} />;
          <Route path="/gallery" exact element={<Gallery />} />;
          <Route path="/projects" exact element={<Projects />} />;
          <Route path="/contact" exact element={<Contact />} />;
          <Route path="*" exact element={<NotFound />} />;
        </Routes>
      </Suspense>

      {showFooter && <Footer/>}
    </div>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? <Loader /> : <AppContent />}
    </Router>
  );
};

export default App;