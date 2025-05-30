import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Footer = () => {
    const getYear = new Date().getFullYear();

    return (
        <div className='bg-black text-white py-6' id='body'>
            <div className='mx-auto max-w-6xl px-4 lg:px-0'>
                <section className='flex flex-col lg:flex-row justify-between items-center gap-4 border-b py-8'>
                    <div className='font-light flex flex-col text-center'>
                        <small>odhistech.mail</small>
                        <small>(254) 704-700-452</small>
                    </div>

                    <img src='/footer.png' className='w-20 h-20'/>

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
                    <a href='/' className='text-[#fcba04] underline underline-offset-2 hover:text-white'>Terms of Service</a>
                    <a href='/' className='text-[#fcba04] underline underline-offset-2 hover:text-white'>Privacy Policy</a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Footer;