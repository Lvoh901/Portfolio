import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tippy';
import { FiSend } from 'react-icons/fi';
import { IoLogoGithub } from 'react-icons/io';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Hero = () => {
  const getYear = new Date().getFullYear();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden dark:bg-black lg:px-4 px-8">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto gap-4">
        {/* Main Heading Section */}
        <motion.section
          id="heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <motion.img
            src="/profile.webp"
            className='rounded-full w-32 h-auto object-cover'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          />

          <div className='flex flex-col justify-center items-center gap-3'>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              Hi, am
            </motion.span>

            <motion.div
              className="font-black text-2xl md:text-3xl lg:text-5xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            >
              Elvis <span className="text-[#FCBA04] uppercase">Odhiambo</span>
            </motion.div>

            {/* highlight text */}
            <motion.p
              className="font-light pb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              id='body'
            >
              a Software Developer and a Product/ Graphic Designer in Nairobi, Kenya. I specialize in Digital products, Responsive Applications, and Branding.
            </motion.p>

            <motion.a
              href='/projects'
              className='flex items-center gap-2 bg-black px-5 py-3 text-white rounded-full cursor-pointer hover:font-bold uppercase border-2 border-[#FCBA04]'
              whileHover={{ scale: 1.05, backgroundColor: '#FCBA04', color: '#000' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Projects <FiSend />
            </motion.a>
          </div>

          <motion.span
            className="pt-2 font-medium text-gray-500 dark:text-gray-300 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
          >
            @ {getYear}
          </motion.span>
        </motion.section>
      </div>
    </div>
  );
};

export default Hero;
