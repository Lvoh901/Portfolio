import React, { useState } from 'react';
import './navigation.css';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io';
import { FaLinkedinIn } from 'react-icons/fa';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = ['Home', 'About', 'Gallery', 'Projects', 'Contact'];
    const socials = [
        { icon: <IoLogoGithub />, href: 'https://github.com/Lvoh901' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/odhiamboelvis/' },
        { icon: <FaXTwitter />, href: 'https://x.com/LvohOdhis' }
    ];

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <header className="nav-header" id='heading'>
            {/* Toggle Button */}
            <button
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
            >
                <span></span>
            </button>

            {/* Fullscreen Menu */}
            <div id="menu" className={isMenuOpen ? 'open' : ''}>
                <nav className="menu-content">
                    <ul className="menu-links">
                        {links.map((link, index) => (
                            <li key={link} style={{ animationDelay: `${index * 0.1}s` }}>
                                <a href={link === 'Home' ? '/' : `${link.toLowerCase()}`} onClick={toggleMenu}>
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <footer className="menu-footer">
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target='_blank'
                                rel='noreferrer'
                                className="social-link"
                                onClick={toggleMenu}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </footer>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;