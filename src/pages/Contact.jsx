import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io';
import { MdOutlineAlternateEmail, MdOutlineLocalPhone } from 'react-icons/md';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Contact = () => {
  return (
    <section className='min-h-screen mx-auto max-w-4xl flex flex-col justify-center items-center px-8' id='heading'>
      <div className='font-black uppercase text-4xl md:text-5xl lg:text-6xl pb-2 animate-fade-up text-center'>get in touch</div>

      <p className='w-full lg:w-[600px] font-light text-center'>I am excited to hear from you and get to create something amazing together. Reach out for any inquiry.</p>

      <p className='pt-7 underline underline-offset-4 decoration-[#fcba04] uppercase font-black text-center'>Reach out directly:</p>

      <h4 className='flex items-center gap-1.5 font-light text-center'><MdOutlineAlternateEmail />: info@odhiambolvis.tech</h4>

      <h4 className='flex items-center gap-1.5 font-light uppercase text-center'><MdOutlineLocalPhone />: (254) 718-505-642</h4>

      <span className='uppercase pt-3'>(mon - fri: 8am - 5pm eat)</span>

      <div className='pt-6 flex gap-3'>
        <Tooltip title="Lvoh901" position="top">
          <a href='https://github.com/Lvoh901' target='_blank' rel='noreferrer'><IoLogoGithub className='w-8 h-8 hover:text-[#fcba04]' /></a>
        </Tooltip>

        <Tooltip title="odhiambolvis" position="top">
          <a href='https://www.linkedin.com/in/odhiamboelvis/' target='_blank' rel='noreferrer'><FaLinkedinIn className='w-8 h-8 hover:text-[#fcba04]' /></a>
        </Tooltip>

        <Tooltip title="LvohOdhis" position="top">
          <a href='https://x.com/LvohOdhis' target='_blank' rel='noreferrer'><FaXTwitter className='w-8 h-8 hover:text-[#fcba04]' /></a>
        </Tooltip>
      </div>
    </section>
  )
}

export default Contact;