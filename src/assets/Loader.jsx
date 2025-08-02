import React from 'react';
import { BlinkBlur } from 'react-loading-indicators';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ isLoading = true }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <BlinkBlur
            color={["#FCBA04", "#327fcd", "#cd32cd", "#cd8032"]}
            size="large"
            speed="fast"
            text=""
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
