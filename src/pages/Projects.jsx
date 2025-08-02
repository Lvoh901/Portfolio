import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCarousel from '../assets/Testimonial';

const projectDetails = [
  {
    id: 1,
    image: '/projects/lsb.webp',
    title: 'LSB',
    description: 'A project focused on digital transformation of the land surveying practice in Kenya.',
    linkUrl: 'https://lsb.go.ke/',
  },
  {
    id: 2,
    image: '/projects/citikom.webp',
    title: 'Citikom',
    description: 'A telecommunications company making significant strides in both connectivity and network coverage.',
    linkUrl: 'https://citikom.co.ke/',
  },
  {
    id:3,
    image: '/projects/SoK.webp',
    title:'Survey of Kenya (SoK)',
    description:'State department of lands and Physical Planning mandated with the regulation and setting standards for all survey and mapping activities in Kenya.',
    linkUrl:'https://survey-kenya.vercel.app/'
  },
  {
    id: 4,
    image: '/projects/agency.webp',
    title: 'Agency',
    description: 'A creative agency revolutionizing software development, custom setups, and consultancy.',
    linkUrl: '',
  },
  {
    id: 5,
    image: '/projects/thriftmall.webp',
    title: 'ThriftMall',
    description: 'A technology integration project for a research institution.',
    linkUrl: 'https://thrifmall.vercel.app/',
  },
  {
    id: 6,
    image: '/projects/intelliworks.webp',
    title: 'Intelliworks',
    description: 'An expert in GeoICT with a flare for modern technologies in software development and data-driven systems.',
    linkUrl: 'https://roy-nine.vercel.app/',
  },
  {
    id: 7,
    image: '/projects/curioshop.webp',
    title: 'LeGance',
    description: 'Discover unique curios and handcrafted treasures to elevate your home into an amazing living space.',
    linkUrl: 'https://curioshop.vercel.app/',
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Projects = () => {
  return (
    <div className="min-h-screen py-20 mx-auto container" id="heading">
      <motion.section
        className="border-b"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        custom={0}
      >
        <motion.h1
          className="font-extrabold tracking-tight text-gray-900 dark:text-white uppercase"
          variants={fadeUpVariant}
          custom={0}
        >
          Projects
        </motion.h1>

        <motion.p
          className="w-full lg:w-[700px] py-2 font-light"
          variants={fadeUpVariant}
          custom={1}
        >
          I have had the privilege of collaborating with both private and public organizations to transform their ideas into impactful digital solutions.
        </motion.p>
      </motion.section>

      {/* projects grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-6">
        {projectDetails.map((project, index) => (
          <motion.a
            href={project.linkUrl || '#'}
            target={project.linkUrl ? '_blank' : '_self'}
            key={project.id}
            className="cursor-pointer relative border border-gray-300 rounded-md overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <img src={project.image} alt={project.title} className="w-full object-cover" />

            <div className='absolute top-0 left-0 bg-black/80 w-full h-full flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300'>
              <h3 className='font-bold'>{project.title}</h3>
              <p className='text-center px-12 font-light'>{project.description}</p>

              <button className='mt-4 px-4 py-2 bg-white text-black rounded-full font-bold cursor-pointer'>View Project</button>
            </div>
          </motion.a>
        ))}
      </section>

      <TestimonialCarousel />
    </div>
  );
};

export default Projects;