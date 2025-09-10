import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Footer = () => {
    const getYear = new Date().getFullYear();

    return (
        <div className='bg-black text-white py-6 dark:bg-gray-800' id='body'>
            <div className='mx-auto max-w-6xl px-8 lg:px-4'>
                <section className='flex flex-col lg:flex-row justify-between items-center gap-4 border-b py-8 dark:border-gray-600'>
                    <div className='font-light flex flex-col text-center'>
                        <span>odhistech.mail</span>
                        <span>(254) 704-700-452</span>
                    </div>

                    <img src='/footer.webp' className='w-20 h-20'/>

                    <div className='flex gap-2'>
                        <FaGithub className='w-6 h-6' />
                        <FaXTwitter className='w-6 h-6' />
                        <FaLinkedinIn className='w-6 h-6' />
                    </div>
                </section>

                <motion.div
                    className="py-2 text-white text-center text-sm font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <span>@{getYear} Elvis Odhiambo. All rights reserved.</span>
                    
                    <div className='space-x-3 pt-3'>
                    <a href='/' className='text-[#fcba04] underline underline-offset-2 hover:text-white dark:hover:text-gray-300'>Terms of Service</a>
                    <a href='/' className='text-[#fcba04] underline underline-offset-2 hover:text-white dark:hover:text-gray-300'>Privacy Policy</a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Footer;