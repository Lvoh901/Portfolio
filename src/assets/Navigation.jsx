import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';

const links = ['Gallery', 'Blog', 'Contact'];

const Navigation = () => {
    const { theme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Always use white text for hamburger for clarity on gray-700
    const hamburgerColor = 'text-white';

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gray-700 text-white shadow-md">
            <div className="container mx-auto px-8 lg:px-4 py-3">
                <div className="flex items-center justify-between h-12">
                    <motion.a
                        href="/"
                        className="border-2 border-[#FCBA04] rounded-full p-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{
                            scale: 1.08,
                            boxShadow: "0 4px 16px 0 rgba(252,186,4,0.15)",
                            borderColor: "#FCBA04"
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <motion.img
                            src='/footer.webp'
                            className='w-10 h-10'
                            whileHover={{
                                rotate: 8,
                                scale: 1.1,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                            transition={{ type: "spring", stiffness: 200 }}
                        />
                    </motion.a>

                    <div className="hidden md:flex items-center space-x-8">
                        {links.map(link => (
                            <a
                                key={link}
                                href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                                className="font-medium hover:text-[#FCBA04] transition-colors duration-300 uppercase text-xs text-white"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className={`z-50 relative w-10 h-10 ${hamburgerColor}`}
                        >
                            <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-1/2' : '-translate-y-1.5'}`} />
                            <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-1/2' : 'translate-y-1.5'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden fixed top-0 left-0 w-full h-screen bg-gray-700 text-white"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            {links.map((link, index) => (
                                <motion.a
                                    key={link}
                                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                                    className="text-white my-4 uppercase font-medium"
                                    onClick={toggleMenu}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navigation;