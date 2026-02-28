import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  // const getYear = new Date().getFullYear();

  return (
    <div className="relative flex items-center justify-center overflow-hidden py-24 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-8 transition-colors duration-300">
        {/* Main Heading Section */}
        <motion.section
          id="heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <motion.img
            src="/profile0.png"
            alt="Profile picture"
            className="rounded-full object-cover shadow-lg transition-all duration-300 hover:border-2 cursor-pointer"
            style={{ width: "calc(8em + 3vw)", height: "auto" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          />

          <div className="flex flex-col justify-center items-center">
            <motion.span
              className=""
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              Hi, I am
            </motion.span>

            <motion.h1
              className="font-black leading-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            >
              Elvis Odhiambo
            </motion.h1>

            {/* highlight text */}
            <motion.p
              className="px-5 mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              id="body"
            >
              a <b className='underline underline-offset-2 decoration-[#FCBA04] decoration-wavy italic'>Full-Stack Developer</b> with a passion for creating <b className='underline underline-offset-2 decoration-[#FCBA04] decoration-wavy italic'>beautiful, functional, and user-centered digital experiences</b>. I have a strong background in both <b className='underline underline-offset-2 decoration-[#FCBA04] decoration-wavy italic'>front-end</b> and <b className='underline underline-offset-2 decoration-[#FCBA04] decoration-wavy italic'>back-end</b> development, and I'm always eager to learn new technologies and take on new challenges. When I'm not coding, you can find me exploring the latest design trends, working on personal projects, or enjoying a good cup of coffee.
            </motion.p>

            <motion.a
              href="/Elvis Odhiambo_Fullstac Developer.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-semibold uppercase border hover:bg-[#FCBA04] hover:text-black transition-all duration-300 my-3 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Download CV
            </motion.a>

            {/* scroll down animation */}
            <div className='pt-8 flex flex-col justify-center items-center'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: [0, 12, 0],  // Animate down and back up (bounce effect)
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: "easeInOut",
                }}
              >
                <ArrowDown className='w-8 h-8 text-[#fcba04]' />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Hero;
