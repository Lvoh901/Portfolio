import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

// images
import AboutImg from '/about1.webp'

const skills = [
  { name: 'JavaScript (ES6+)', level: '95%' },
  { name: 'React & Next.js', level: '90%' },
  { name: 'Node.js & Express', level: '85%' },
  { name: 'HTML5 & CSS3', level: '98%' },
  { name: 'Tailwind CSS', level: '95%' },
  { name: 'SQL & NoSQL Dbs', level: '80%' },
  { name: 'UI/UX Design', level: '85%' },
  { name: 'RESTful APIs', level: '90%' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto py-20 px-8 lg:px-0">
        <motion.div
          className=""
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
            About <span className="text-[#FCBA04]">Me</span>
          </h1>

          <p className="mt-4 text-gray-900 dark:text-gray-400">
            A passionate developer who loves building amazing things.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-2">
          <motion.div
            className=""
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-bold text-gray-900 dark:text-white">Who I Am</h2>

            <p className="text-gray-800 dark:text-gray-300 py-3">
              I'm a Full-Stack Developer with a passion for creating beautiful, functional, and user-centered digital experiences. I have a strong background in both front-end and back-end development, and I'm always eager to learn new technologies and take on new challenges.
            </p>

            <p className="text-gray-800 dark:text-gray-300 pb-2">
              When I'm not coding, you can find me exploring the latest design trends, working on personal projects, or enjoying a good cup of coffee.
            </p>

            <motion.a
              href="/Elvis Odhiambo_Fullstac Developer.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold uppercase border-2 c hover:bg-[#FCBA04] hover:text-black transition-all duration-300 mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <FiDownload />
              Resume
            </motion.a>

            <img src={AboutImg} className='rounded-lg border border-[#fcba04]'/>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-bold text-gray-900 dark:text-white">My Tech Skills</h2>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <p className="font-medium text-gray-800 dark:text-gray-300">{skill.name}</p>
                    <p className="font-medium text-gray-800 italic dark:text-gray-400">{skill.level}</p>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-5">
                    <motion.div
                      className="bg-[#FCBA04] h-5"
                      style={{ width: skill.level }}
                      initial={{ width: 0 }}
                      animate={{ width: skill.level }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
