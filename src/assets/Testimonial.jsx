import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        quote:
            "Elvis transformed our outdated platform into a stunning and responsive digital product. His attention to design and functionality is unmatched.",
        author: "Cynthia W., Creative Director – Nova Brands",
    },
    {
        quote:
            "From strategy to execution, Elvis delivered beyond expectations. We saw measurable engagement growth within weeks.",
        author: "David M., CEO – UrbanTech Solutions",
    },
    {
        quote:
            "He doesn't just write code, he solves problems with precision. Highly recommended for complex and modern applications.",
        author: "Angela R., Product Lead – CivicData Kenya",
    },
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
        <div
            className="py-12 relative"
            onMouseEnter={() => clearInterval(containerRef.current)}
            onMouseLeave={() =>
                (containerRef.current = setInterval(() => cycleTestimonials(1), 15000))
            }
        >
            <h4 className="text-center font-semibold uppercase text-lg underline underline-offset-4 decoration-4 decoration-[#fcba04] mb-8">
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
                        <h4 className="text-gray-800 dark:text-gray-100 italic font-light leading-relaxed">
                            “{testimonials[current].quote}”
                        </h4>

                        <h5 className="mt-4 font-medium uppercase text-[#FCBA04] text-sm tracking-wide">
                            — {testimonials[current].author}
                        </h5>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className='space-x-3 pt-5'>
                    <button
                        onClick={() => cycleTestimonials(-1)}
                        className="bg-[#fcba04]/90 hover:bg-[#fcba04] p-2 rounded-full shadow text-black cursor-pointer"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={() => cycleTestimonials(1)}
                        className="bg-[#fcba04]/90 hover:bg-[#fcba04] p-2 rounded-full shadow text-black cursor-pointer"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;