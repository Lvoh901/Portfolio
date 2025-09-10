import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io';
import { MdOutlineAlternateEmail, MdOutlineLocalPhone } from 'react-icons/md';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Contact = () => {
  return (
    <section className='min-h-screen mx-auto max-w-6xl  py-20 px-8 lg:px-0 flex flex-col justify-center items-center'>
      <h1 className='font-black capitalize animate-fade-up text-center'>get in touch</h1>

      <p className='w-full lg:w-[600px] text-center'>I am excited to hear from you and get to create something amazing together. Reach out for any inquiry.</p>

      <h4 className='pt-5 underline underline-offset-4 decoration-[#fcba04] uppercase font-black text-center'>Reach out directly:</h4>

      <p className='flex items-center gap-1.5 font-light text-center'>info@odhiambolvis.tech</p>

      <p className='flex items-center gap-1.5 font-light uppercase text-center'><MdOutlineLocalPhone />: (254) 718-505-642</p>

      <p className='uppercase pt-3 text-center'>(mon - fri: 8am - 5pm eat)</p>

      <div className='pt-6 flex gap-3'>
        <Tooltip title="Lvoh901" position="top">
          <a href='https://github.com/Lvoh901' target='_blank' rel='noreferrer'><IoLogoGithub className='w-8 h-8 hover:text-[#fcba04] dark:hover:text-[#fcba04]' /></a>
        </Tooltip>

        <Tooltip title="odhiambolvis" position="top">
          <a href='https://www.linkedin.com/in/odhiamboelvis/' target='_blank' rel='noreferrer'><FaLinkedinIn className='w-8 h-8 hover:text-[#fcba04] dark:hover:text-[#fcba04]' /></a>
        </Tooltip>

        <Tooltip title="LvohOdhis" position="top">
          <a href='https://x.com/LvohOdhis' target='_blank' rel='noreferrer'><FaXTwitter className='w-8 h-8 hover:text-[#fcba04] dark:hover:text-[#fcba04]' /></a>
        </Tooltip>
      </div>
    </section>
  )
}

export default Contact;