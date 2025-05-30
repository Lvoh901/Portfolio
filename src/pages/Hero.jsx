import React from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Hero = () => {
  const getYear = new Date().getFullYear();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white dark:bg-black lg:px-4 px-8 py-16">
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-4">
        {/* Main Heading Section */}
        <motion.section
          id="heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <img src="/profile.png" className='rounded-full w-32 h-auto object-cover' />

          <div>
            <span>Hi, am</span>

            <motion.h4
              className="font-bold"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Elvis <span className="text-[#FCBA04] uppercase">Odhiambo</span>
            </motion.h4>
          </div>

          {/* highlight text */}
          <motion.p
            className="text-gray-800 dark:text-gray-200 max-w-xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            id='body'
          >
            a Product and Graphic Designer in Nairobi, Kenya. <br /> I specialize in UI/UX Design, Responsive Applications, and Branding.
          </motion.p>

          {/* main */}
          <motion.h1
            className="text-gray-800 dark:text-gray-200 max-w-xl leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            id='heading'>
            <span className='uppercase underline underline-offset-4 decoration-[#fcba04]'>Building</span> Exceptional User Experiences & Brands
          </motion.h1>

          <a href='/contact' className='flex items-center gap-2 bg-black px-5 py-3 text-white rounded-full cursor-pointer hover:font-bold uppercase border-2'>Contact <FiSend /></a>

          <motion.p
            className="pt-2 font-semibold text-gray-500 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            @{getYear}
          </motion.p>
        </motion.section>
      </div>
    </div>
  );
};

export default Hero;
