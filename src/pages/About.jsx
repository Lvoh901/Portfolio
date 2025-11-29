import React from 'react';
import { motion } from 'framer-motion';

// Skill images (now using local /icons/ directory)
const skillImages = {
  'JavaScript': '/icons/js.png',
  'React & Next.js': '/icons/reactjs.png',
  'Node.js & Express': '/icons/nodejs.png',
  'HTML5 & CSS3': '/icons/html5.png',
  'Tailwind CSS': '/icons/tailwind.png',
  'SQL & NoSQL': '/icons/mysql.png',
  'VueJs': '/icons/vuejs.png',
  'RESTful APIs': '/icons/api.png',
  'Laravel': '/icons/laravel.png',
  'Flutter': '/icons/flutter.png',
};

const skills = [
  { name: 'JavaScript' },
  { name: 'React & Next.js' },
  { name: 'Node.js & Express' },
  { name: 'HTML5 & CSS3' },
  { name: 'Tailwind CSS' },
  { name: 'SQL & NoSQL' },
  { name: 'VueJs' },
  { name: 'RESTful APIs' },
  { name: 'Laravel' },
  { name: 'Flutter' },
];

const About = () => {
  return (
    <div className="py-4">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className='flex gap-1'>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-gray-900 dark:text-white underline underline-offset-4 decoration-[#FCBA04] decoration-wavy">
              Tech
            </motion.h3>

            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className='font-bold text-[#FCBA04]'>
              Stack
            </motion.h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-1">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md font-semibold uppercase border hover:bg-[#FCBA04] hover:text-black transition-all duration-300 mb-3 text-sm cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
