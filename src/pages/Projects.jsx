import React from 'react';
import { motion } from 'framer-motion';

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
    linkUrl: 'https://lsb.go.ke/',
  },
  {
    id: 2,
    image: Project5,
    title: 'Citikom',
    description: 'A digital product development project for a startup.',
    linkUrl: 'https://citikom.co.ke/',
  },
  {
    id: 3,
    image: Project2,
    title: 'Agency',
    description: 'A branding and UI/UX project for a creative agency.',
    linkUrl: '',
  },
  {
    id: 4,
    image: Project3,
    title: 'TechLabs',
    description: 'A technology integration project for a research institution.',
    linkUrl: '',
  },
  {
    id: 5,
    image: Project4,
    title: 'Digitrek',
    description: 'A digital product development project for a startup.',
    linkUrl: '',
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
    <div className="min-h-screen py-4 px-8 mx-auto max-w-7xl" id="heading">
      <motion.section
        className="border-b"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        custom={0}
      >
        <motion.div
          className="font-black uppercase text-4xl md:text-5xl lg:text-6xl pb-2"
          variants={fadeUpVariant}
          custom={0}
        >
          Projects
        </motion.div>

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
            className="cursor-pointer relative border border-gray-300 rounded-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <img src={project.image} alt={project.title} className="w-full object-cover" />
          </motion.a>
        ))}
      </section>

      <TestimonialCarousel />
    </div>
  );
};

export default Projects;