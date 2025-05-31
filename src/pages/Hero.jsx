import React from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Hero = () => {
  const getYear = new Date().getFullYear();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden dark:bg-black lg:px-4 px-8 py-16">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto gap-4">
        {/* Main Heading Section */}
        <motion.section
          id="heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <img src="/profile.png" className='rounded-full w-32 h-auto object-cover' />

          <div className='flex flex-col justify-center items-center'>
            <span>Hi, am</span>

            <motion.div
              className="font-black text-2xl md:text-3xl lg:text-5xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Elvis <span className="text-[#FCBA04] uppercase">Odhiambo</span>
            </motion.div>

            {/* highlight text */}
            <motion.p
              className="text-gray-800 dark:text-gray-200 font-extralight pb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              id='body'
            >
              a Product/ Graphic Designer in Nairobi, Kenya. I specialize in UI/UX Design, Responsive Applications, and Branding.
            </motion.p>

            <a href='/contact' className='flex items-center gap-2 bg-black px-5 py-3 text-white rounded-full cursor-pointer hover:font-bold uppercase border-2'>Contact <FiSend /></a>
          </div>

          <motion.small
            className="pt-2 font-semibold text-gray-500 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            @{getYear}
          </motion.small>
        </motion.section>
      </div>
    </div>
  );
};

export default Hero;
