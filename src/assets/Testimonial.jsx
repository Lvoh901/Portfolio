import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        quote: "Elvis transformed our outdated platform into a stunning and responsive digital product. His attention to design and functionality is unmatched.",
        author: "Cynthia W., Creative Director - Nova Brands",
    },
    {
        quote: "From strategy to execution, Elvis delivered beyond expectations. We saw measurable engagement growth within weeks.",
        author: "David M., CEO - UrbanTech Solutions",
    },
    {
        quote: "He doesn't just write code, he solves problems with precision. Highly recommended for complex and modern applications.",
        author: "Angela R., Product Lead - CivicData Kenya",
    },
];

const Testimonial = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // for animation direction

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 15000); // 15 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='py-12'>
            <h4 className='text-center font-medium uppercase underline underline-offset-4 decoration-4 decoration-[#fcba04]'>
                What My Clients Say
            </h4>

            <div className="relative w-full max-w-3xl mx-auto px-4 py-4 text-center overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{ duration: 0.7 }}
                        className="px-6"
                    >
                        <h3 className="font-light text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-100 italic">
                            “{testimonials[current].quote}”
                        </h3>

                        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-[#FCBA04]">
                            — {testimonials[current].author}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Testimonial;