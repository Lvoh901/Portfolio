import React from 'react';
import SimpleCarousel from '../assets/SimpleCarousel';

// photos

const About = () => {
  return (
    <section className="min-h-screen" id='heading'>
      {/* upper content */}
      <div className="flex flex-col items-center justify-center pt-4 text-center">
        <div className="font-black uppercase text-4xl md:text-5xl lg:text-6xl pb-2">In-Depth</div>

        <img src='/about.jpg' />
      </div>

      <section className='mx-auto max-w-7xl px-8 lg:px-0'>
        <div className='py-6 flex flex-col lg:flex-row items-center gap-5'>
          <img src='/about1.jpg' />

          <div className=''>
            <small className='uppercase underline underline-offset-4 decoration-2 decoration-[#FCBA04] font-medium' id='heading'>me in a nut-shell</small>

            <p className='font-extralight'>Coding for clarity, fueled by perfectionism and a quirky love for <span className='font-black underline underline-offset-4 text-[#FCBA04]'>13</span>. I cherish personal space, and unwind with good food, eclectic tunes, random walks/hikes, and gaming escapades.</p>
          </div>
        </div>
      </section>

      <div>
        <video src='/about.mp4' autoPlay muted loop controls className='w-full' />
      </div>

      {/* my strory */}
      <section className='mx-auto max-w-6xl px-8 lg:px-0 py-5 flex flex-col lg:flex-row gap-5'>
        <h1 className='uppercase font-black text-center'>my story<span className='text-[#FCBA04]'>.</span></h1>

        <div className='mx-auto max-w-4xl space-y-4'>
          <p className='font-extralight'>
            My journey into tech began with curiosity — taking apart desktops, exploring software, and diving deep into how things worked. What started as fascination quickly turned into a lifelong passion. After years of self-discovery, I formally trained as a developer and never looked back.
          </p>

          <p className='font-extralight'>
            Today, I'm a <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04] font-medium'>Fullstack developer</span> with a strong grasp of <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04] font-medium'>React, Node.js, Express</span>, and <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04] font-medium'>Laravel</span>. I also bring self-taught skills in <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04] font-medium'>Photoshop</span> and <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04] font-medium'>Illustrator</span>, enabling me to build digital experiences that are both functional and visually refined. In 2023, I took on a leadership role guiding a GIS and software team — a reflection of my commitment to solving modern challenges through code, design, and innovation.
          </p>
        </div>
      </section>

      {/* additional */}
      <div className='mx-auto max-w-7xl py-6 px-8 lg:px-0'>
        <small className='uppercase underline underline-offset-4 decoration-2 decoration-[#FCBA04] font-medium' id='heading'>on the otherside</small>

        <p className='font-extralight py-3'>Outside of coding, I looove hiking, gaming, photography, and travel.</p>

        {/* photo gallery */}
        <SimpleCarousel/>
      </div>
    </section>
  );
};

export default About;