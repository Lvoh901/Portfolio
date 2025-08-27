import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const links = ['About', 'Projects', 'Gallery', 'Contact'];

// toggle button
const ThemeToggleLucide = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 p-2 rounded-full border border-transparent 
             hover:border-[#FCBA04] transition-colors duration-300 
             focus:outline-none focus:ring-2 focus:ring-[#FCBA04] 
             bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-gray-800" />
                )}
            </motion.div>
        </button>
    );
};

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

    const hamburgerColor = isMenuOpen ? 'text-black dark:text-white' : isScrolled ? 'text-white' : 'text-gray-900 dark:text-white';

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
            ${isScrolled
                ? 'bg-gray-700 dark:bg-gray-900 shadow-md'
                : 'bg-transparent'
            }`}>
            <div className="container mx-auto py-2 px-4 lg:px-0">
                <div className="flex items-center justify-between h-12">
                    <motion.a
                        href="/"
                        className="bg-gray-700 dark:bg-gray-800 rounded-full p-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <img src='/footer.webp' className='w-10 h-10' />
                    </motion.a>

                    <div className="hidden md:flex items-center space-x-8">
                        {links.map(link => (
                            <a key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="font-medium hover:text-[#FCBA04] transition-colors duration-300 uppercase text-xs text-gray-900 dark:text-white">
                                {link}
                            </a>
                        ))}
                        <ThemeToggleLucide />
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
                        className="md:hidden fixed top-0 left-0 w-full h-screen bg-white dark:bg-gray-900"
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
                                    className="text-gray-900 dark:text-white my-4 uppercase font-medium"
                                    onClick={toggleMenu}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                                >
                                    {link}
                                </motion.a>
                            ))}
                            <ThemeToggleLucide />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navigation;