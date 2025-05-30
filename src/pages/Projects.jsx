import React from 'react';

// images
import Project1 from '../projects/lsb.webp';
import Project2 from '../projects/agency.webp';
import Project3 from '../projects/techlabs.webp';
import Project4 from '../projects/digitrek.webp';
import Project5 from '../projects/citikom.webp';
import TestimonialCarousel from '../assets/Testimonial';

const projectDetails = [
  {
    id: 1,
    image: Project1,
    title: 'LSB',
    description: 'A project focused on digital transformation for a leading financial institution.',
    linkUrl: 'https://lsb.go.ke/'
  },
  {
    id: 2,
    image: Project5,
    title: 'Citikom',
    description: 'A digital product development project for a startup.',
    linkUrl: 'https://citikom.co.ke/'
  },
  {
    id: 3,
    image: Project2,
    title: 'Agency',
    description: 'A branding and UI/UX project for a creative agency.',
    linkUrl: ''
  },
  {
    id: 4,
    image: Project3,
    title: 'TechLabs',
    description: 'A technology integration project for a research institution.',
    linkUrl: ''
  },
  {
    id: 5,
    image: Project4,
    title: 'Digitrek',
    description: 'A digital product development project for a startup.',
    linkUrl: ''
  },
];

const Projects = () => {
  return (
    <div className='min-h-screen p-4 mx-auto max-w-7xl' id='heading'>
      <section className='border-b'>
        <div className='font-black uppercase text-4xl md:text-5xl lg:text-6xl pb-2'>Projects</div>

        <p className='w-full lg:w-[700px] py-2 font-light'>I have had the privilege of collaborating with both private and public organizations to transform their ideas into impactful digital solutions.</p>

        <p className='w-full lg:w-[700px] py-2 font-light'>Below are some project highlights—each thoughtfully crafted with a clear design vision, purposeful mission, and measurable outcomes.</p>
      </section>

      {/* projects grid */}
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-5 py-3'>
        {projectDetails.map(project => (
          <div key={project.id} className='cursor-pointer relative'>
            <img src={project.image} alt={project.title} className='w-full' />

            <div className='absolute bottom-0 left-0 px-4 py-2 bg-white rounded-tr-lg'>
              <a href={project.linkUrl} target='_blank' className='hover:text-[#fcba04] font-medium'>{project.title}</a>
            </div>
          </div>
        ))}
      </section>

      <TestimonialCarousel />
    </div>
  )
}

export default Projects;