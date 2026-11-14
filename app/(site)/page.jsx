import { Suspense } from 'react';
import Hero from '../../src/components/Hero';
import Projects from '../../src/components/Projects';
import ServicePack from '../../src/components/ServicePack';
import About from '../../src/components/About';
import Process from '../../src/components/Process';
import Testimonial from '../../src/components/Testimonial';
import FAQ from '../../src/components/FAQ';
import Contact from '../../src/components/Contact';

const HomePage = () => (
  <>
    <Hero />
    <Projects />
    <ServicePack />
    <About />
    <Process />
    <Testimonial />
    <FAQ />
    <Suspense fallback={null}>
      <Contact />
    </Suspense>
  </>
);

export default HomePage;
