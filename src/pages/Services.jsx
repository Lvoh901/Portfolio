import React from 'react';
import { FiSend } from 'react-icons/fi';

const serviceStep = [
  {
    step: 'Step 1',
    stepName: 'Interview',
    stepDescription: 'Together, we will explore your vision, goals, and challenges to craft a tailored solution that meets your unique needs.'
  },
  {
    step: 'Step 2',
    stepName: 'Build',
    stepDescription: 'Through two rounds of revisions, we will ensure your site is built to exceed your expectations, incorporating your feedback every step of the way.'
  },
  {
    step: 'Step 3',
    stepName: 'Review',
    stepDescription: 'We finalize your content, polish the site to perfection, and hand over your new digital presence.'
  }
]

const Services = () => {
  return (
    <div className='min-h-screen p-4 mx-auto max-w-7xl' id='body'>
      <div className='font-black uppercase text-4xl md:text-5xl lg:text-6xl pb-2 animate-fade-up'>what i offer</div>

      <div className='pt-4'>
        <h1>My Process</h1>

        <div className='space-y-2 w-[800px] font-light'>
          <p>My process is rooted in trust and collaboration. Whether it's a fullstack JavaScript application, a Laravel backend, or a custom UI crafted in Adobe tools, I tailor each solution to meet your specific needs — functionally and visually. Let's build what your brand actually needs, not what worked for someone else.</p>
        </div>
      </div>

      {/* 3step process */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-7'>
        {serviceStep.map((service, index) => (
          <div key={index} className='border border-[#fcba04] rounded shadow-md p-6'>
            <h3 className='uppercase font-bold pb-3'>{service.step}. {service.stepName}</h3>
            <p className='font-light'>{service.stepDescription}</p>
          </div>
        ))}
      </div>

      <div className='pt-9 space-y-5 mx-auto max-w-4xl flex flex-col justify-center items-center text-center'>
        <h3 className='font-light'>I would love to learn more about your project and for me to walk you through my build process in more detail. Reach out today and we'll talk soon.</h3>

        <a href='/contact' className='flex items-center gap-2 bg-black px-5 py-3 text-white rounded-full cursor-pointer hover:font-bold uppercase border-2 border border-[#fcba04]'>Contact <FiSend /></a>
      </div>
    </div>
  )
}

export default Services;