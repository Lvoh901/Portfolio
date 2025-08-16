import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

// images
import AboutImg from '/about1.webp';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto py-20 px-8 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-2">
          <motion.div
            className=""
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                About <span className="text-[#FCBA04]" id='name'>Me</span>
              </h1>

              <p className="mt-4 text-gray-900 dark:text-gray-400">
                A passionate developer who loves building amazing things.
              </p>
            </motion.div>

            <h3 className="font-bold text-gray-900 dark:text-white">Who I Am</h3>

            <p className="text-gray-800 dark:text-gray-300 py-3">
              I'm a Full-Stack Developer with a passion for creating beautiful, functional, and user-centered digital experiences. I have a strong background in both front-end and back-end development, and I'm always eager to learn new technologies and take on new challenges.
            </p>

            <p className="text-gray-800 dark:text-gray-300 pb-5">
              When I'm not coding, you can find me exploring the latest design trends, working on personal projects, or enjoying a good cup of coffee.
            </p>

            <motion.a
              href="/Elvis Odhiambo_Fullstac Developer.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-semibold uppercase border-2 c hover:bg-[#FCBA04] hover:text-black transition-all duration-300 mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <FiDownload />
              Resume
            </motion.a>

            <img src={AboutImg} className='rounded-lg border border-[#fcba04]' />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white">My Tech Stack</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center p-5 transition-transform hover:scale-105 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 flex items-center justify-center mb-3">
                    <img
                      src={skillImages[skill.name]}
                      alt={skill.name + " icon"}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <small className="font-semibold text-center text-gray-900 dark:text-white mb-1">{skill.name}</small>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
