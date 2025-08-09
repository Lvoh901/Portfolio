import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
    {
        image: '/photos/image1.webp',
        title: 'Upperhill Skyline',
        description: 'A panoramic view of the Upperhill Skyline during a vibrant sunset.',
    },
    {
        image: '/photos/image2.webp',
        title: 'Upperhill Skyline',
        description: 'The Upperhill Skyline at dusk, showcasing the blend of old and new architecture.',
    },
    {
        image: '/photos/image3.webp',
        title: 'Countryside Views',
        description: 'A serene countryside scene at dawn, with the misty lake in the background.',
    },
    {
        image: '/photos/image4.webp',
        title: 'Thika Road Views',
        description: 'A scenic drive along the Thika Road, capturing the urban landscape.',
    },
    {
        image: '/photos/image5.webp',
        title: 'Random Walks - Rongai',
        description: 'Exploring the serene and peaceful surroundings of Rongai.',
    },
    {
        image: '/photos/image6.webp',
        title: 'Namanga',
        description: 'A glimpse into the vibrant town of Namanga, known for its rich history.',
    },
    {
        image: '/photos/image7.webp',
        title: 'Amboseli National Park',
        description: 'A majestic view of the Amboseli National Park, home to diverse wildlife.',
    },
    {
        image: '/photos/image8.webp',
        title: 'Elephant - Amboseli',
        description: 'A close encounter with an elephant in the Amboseli National Park.',
    },
    {
        image: '/photos/image9.webp',
        title: 'Lake Challa - Tanzania',
        description: 'The serene and tranquil atmosphere of Lake Challa in Tanzania.',
    },
    {
        image: '/photos/image10.webp',
        title: 'Mt. Ugweno - Tanzania',
        description: 'A breathtaking view of Mt. Ugweno in Tanzania, a haven for hikers.',
    },
];

const SimpleCarousel = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () =>
        setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative max-w-4xl mx-auto overflow-hidden bg-white rounded-2xl shadow-xl" id='heading'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-80 object-cover rounded-t-2xl"
                    />
                    <div className="p-6 text-center">
                        <h3 className="uppercase">{slides[current].title}</h3>
                        <span className="text-gray-800 mt-2 font-light">{slides[current].description}</span>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <button
                    onClick={prevSlide}
                    className="bg-black/50 text-[#fcba04] p-2 rounded-full hover:bg-black transition"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft />
                </button>
            </div>

            <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <button
                    onClick={nextSlide}
                    className="bg-black/50 text-[#fcba04] p-2 rounded-full hover:bg-black transition"
                    aria-label="Next slide"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default SimpleCarousel;