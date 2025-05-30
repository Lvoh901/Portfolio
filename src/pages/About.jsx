import React from 'react';
import { FiSend } from 'react-icons/fi';

// photos

const About = () => {
  return (
    <section className="min-h-screen" id='heading'>
      {/* upper content */}
      <div className="flex flex-col items-center justify-center pt-4 text-center">
        <div className="font-black uppercase text-4xl md:text-5xl lg:text-6xl pb-2">In-Depth</div>

        <img src='/about.jpg' />
      </div>

      <section className='mx-auto max-w-7xl px-4 lg:px-0' id='body'>
        <div className='py-6 flex flex-col lg:flex-row items-center gap-5'>
          <img src='/about1.jpg' />

          <div className=''>
            <small className='uppercase underline underline-offset-4 decoration-2 decoration-[#FCBA04] font-medium' id='heading'>me in a nut-shell</small>

            <div className='font-extralight text-2xl lg:text-3xl'>I code to clear my mind, I am a perfectionist, my favorite number is <span className='italic font-black underline underline-offset-4 text-[#FCBA04]'>13</span>, I love creating random things, am an introvert - personal space is everything, chapati anyday, good music gets me going anytime [I have no favorite genre], and a gamer.</div>
          </div>
        </div>
      </section>

      <div>
        <video src='/about.mp4' autoPlay muted loop controls className='w-full' />
      </div>

      {/* my strory */}
      <section className='mx-auto max-w-6xl px-4 lg:px-0 py-5 flex flex-col lg:flex-row gap-5'>
        <h1 className='uppercase font-black text-center'>my story<span className='text-[#FCBA04]'>.</span></h1>

        <div className='mx-auto max-w-4xl space-y-2 font-light'>
          <p>From my earliest memories of interacting with a computer, I knew technology would be a central part of my life. Whether I was exploring software or disassembling and reassembling desktop hardware just to understand how it all worked, my curiosity grew into a deep passion. Tech wasn't just something I liked — it became my lifelong calling.</p>

          <p>Though my professional journey into tech took time, it was a personal challenge I was determined to overcome. After years of putting it off, I finally committed to formal training and skill-building, stepping fully into the world of development.</p>

          <p>Today, I'm a <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>JavaScript fullstack developer</span> with a strong command of both front-end and back-end technologies. I specialize in building modern, scalable web applications using JavaScript frameworks like <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>React, Node.js</span>, and <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>Express</span>. On the server side, I.m also proficient in <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>PHP</span>, particularly with <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>Laravel</span>, which allows me to build robust and secure APIs, CMS platforms, and dynamic web applications.</p>

          <p>In addition to development, I'm a self-taught <span className='uppercase font-medium italic text-[#fcba04]'>graphic designer</span> with hands-on experience using <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>Adobe Illustrator</span> and <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04]'>Photoshop</span>. My design work supports my development projects — giving me the ability to craft seamless digital experiences that are not only functional but visually compelling.</p>

          <p>In <span className='underline underline-offset-2 decoration-2 decoration-[#fcba04] font-medium'>2023</span>, I stepped into a leadership role as a team lead, guiding a talented group of software and GIS developers. This position has not only sharpened my technical and communication skills but also deepened my commitment to using technology as a tool for positive impact. I'm driven by the belief that code should do more than function—it should solve real-world problems.</p>

          <p>Whether it's streamlining operations, enhancing digital accessibility, or helping brands establish stronger online identities, I continuously explore new technologies and development strategies. My focus remains on delivering solutions that are both innovative and practical — bridging the gap between creative ideas and scalable tech implementation.</p>
        </div>
      </section>

      {/* additional */}
      <div className='mx-auto max-w-7xl py-6 px-4 lg:px-0'>
        <small className='uppercase underline underline-offset-4 decoration-2 decoration-[#FCBA04] font-medium' id='heading'>on the otherside</small>

        <div className='font-extralight text-xl lg:text-2xl py-3'>Outside of coding, I looove hiking, gaming, photography, and travel.</div>

        {/* photo gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 auto-rows-[150px]">
          <img src="/photos/image1.jpg" alt="Image 1" className="object-cover w-full h-full row-span-2 col-span-2 rounded-lg" />
          <img src="/photos/image2.jpg" alt="Image 2" className="object-cover w-full h-full rounded-lg" />
          <img src="/photos/image19.jpg" alt="Image 19" className="object-cover w-full h-full rounded-lg" />
          <img src="/photos/image6.jpg" alt="Image 6" className="object-cover w-full h-full rounded-lg" />
          <img src="/photos/image12.jpg" alt="Image 12" className="object-cover w-full h-full rounded-lg" />
          <img src="/photos/image5.jpg" alt="Image 5" className="object-cover w-full h-full col-span-2 rounded-lg" />
          <img src="/photos/image7.jpg" alt="Image 7" className="object-cover w-full h-full row-span-2 rounded-lg" />
          <img src="/photos/image16.jpg" alt="Image 16" className="object-cover w-full h-full rounded-lg" />
          <img src="/photos/image10.jpg" alt="Image 10" className="object-cover w-full h-full col-span-2 rounded-lg" />
          <img src="/photos/image13.jpg" alt="Image 13" className="object-cover w-full h-full rounded-lg" />
        </div>
      </div>

      {/* cta */}
      <section className='bg-[#fcba04]' id=''>
        <div className='mx-auto max-w-4xl py-12 grid grid-cols-1 lg:grid-cols-2 gap-3'>
          <div className='font-bold uppercase leading-tight text-white text-center' style={{fontSize:'calc(5em + 2vw)'}}>Shall We?</div>

          <div className='flex flex-col justify-start items-start'>
            <p className='font-light pb-1.5'>
              I'm a flexible freelance developer—adaptable across locations and open to diverse project scopes.
              Whether you're launching a new product, need technical consultation, or want hands-on development support, I'm here to help.
            </p>

            <p className='font-light py-1.5'>Open to new clients, collaborations, and challenges.</p>

            <p className='font-light pb-1.5'>Got an upcoming project? Let's talk and explore how I can contribute to your success.</p>

            <a href='/contact' className='flex items-center gap-2 bg-black px-5 py-3 text-white rounded-full cursor-pointer hover:font-bold uppercase border-2'>Contact <FiSend /></a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;