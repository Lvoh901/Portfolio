import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Process from '../assets/Process';
import ServicePack from '../assets/ServicePack';

gsap.registerPlugin(ScrollTrigger);

const ProcessJourney = () => {
  const pinContainerRef = useRef(null);
  const processTrackRef = useRef(null);

  useLayoutEffect(() => {
    const pin = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          scrub: 1,
          // Set a fixed scroll duration for the entire animation
          end: '+=4000',
        },
      });

      // Animate the horizontal track of the Process component
      timeline.to(processTrackRef.current, {
        // Calculate the distance to move based on scrollWidth and the viewport width
        x: () => -(processTrackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
      });
    }, pinContainerRef);

    return () => pin.revert();
  }, []);

  return (
    <div ref={pinContainerRef}>
      <div className='flex justify-center gap-1 py-8'>
        <h3
          className="font-bold text-gray-900 dark:text-white underline underline-offset-4 decoration-[#FCBA04] decoration-wavy">
          My Work Process
        </h3>
      </div>
      {/* Pass the ref to the inner track of the Process component */}
      <Process ref={processTrackRef} />
      <ServicePack />
    </div>
  );
};

export default ProcessJourney;
