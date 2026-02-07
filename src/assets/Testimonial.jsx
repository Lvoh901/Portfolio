import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        quote: "With Elvis's expertise in web development and automation, our organization now operates on a highly efficient and automated digital platform. His commitment drove us to achieve operational excellence in record time.",
        author: "Land Surveyors' Board Secretariat",
    },
    {
        quote: "Elvis transformed our outdated legacy system into a powerful, modern, and user-friendly digital platform. His web development skills made our business far more visible and accessible online.",
        author: "Citikom CEO",
    },
    {
        quote: "While my platform is still under development, the updated website already provides my clients with a fresh, professional interface that strengthens our brand and builds trust in our business.",
        author: "LeGance CEO",
    }
];

const Testimonial = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef(null);

    const cycleTestimonials = (dir = 1) => {
        setDirection(dir);
        setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(() => cycleTestimonials(1), 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <img src="./about.jpg" alt="value" className='w-full h-full object-cover' />

            <div
                className="py-28 relative bg-gray-200"
                onMouseEnter={() => clearInterval(containerRef.current)}
                onMouseLeave={() =>
                    (containerRef.current = setInterval(() => cycleTestimonials(1), 15000))
                }
            >
                <h4 className="text-center font-semibold uppercase text-lg underline underline-offset-4 decoration-4 decoration-[#fcba04] mb-8 dark:text-white">
                    What My Clients Say
                </h4>

                <div className="relative w-full max-w-3xl mx-auto px-4 text-center overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="px-4 lg:px-8"
                        >
                            <p className="text-gray-800 dark:text-gray-100 italic leading-relaxed pb-3">
                                “{testimonials[current].quote}”
                            </p>

                            <b className="mt-4 font-medium uppercase tracking-wide dark:text-gray-300 italic">
                                — {testimonials[current].author}
                            </b>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className='space-x-3 pt-5'>
                        <button
                            onClick={() => cycleTestimonials(-1)}
                            className="bg-[#fcba04]/60 hover:bg-[#fcba04] p-5 rounded-full shadow text-black cursor-pointer"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={() => cycleTestimonials(1)}
                            className="bg-[#fcba04]/60 hover:bg-[#fcba04] p-5 rounded-full shadow text-black cursor-pointer"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;