import React, { useState } from 'react';
import './navigation.css';
import { FaTwitter, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = ['Home', 'About', 'Gallery', 'Projects', 'Services', 'Contact'];
    const socials = [
        { icon: <FaTwitter />, label: 'Twitter', href: '#' },
        { icon: <FaEnvelope />, label: 'Subscribe', href: '#' },
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
                                className="social-link"
                                onClick={toggleMenu}
                            >
                                {social.icon}
                                <span>{social.label}</span>
                            </a>
                        ))}
                    </footer>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;