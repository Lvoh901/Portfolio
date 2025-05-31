import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// pages
import Navigation from './assets/Navigation';
import Hero from './pages/Hero';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import NotFound from './pages/404';

const App = () => {
  return (
    <div className='bg-gray-50'>
      <Navigation />

      <Routes>
        <Route path="/" exact element={<Hero />} />;
        <Route path="/about" exact element={<About />} />;
        <Route path="/gallery" exact element={<Gallery />} />;
        <Route path="/projects" exact element={<Projects />} />;
        <Route path="/contact" exact element={<Contact />} />;
        <Route path="*" exact element={<NotFound />} />;
      </Routes>

      <Footer/>
    </div>
  )
}

export default App;