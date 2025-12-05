import React, { useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaEnvelope, FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { supabase } from '../supabaseClient';
// Lucide React icons
import {
  Globe,
  Smartphone,
  BadgePercent,
  PenTool,
  MonitorSmartphone,
  Lightbulb,
  Users,
} from 'lucide-react';

const SERVICE_OPTIONS = [
  {
    value: 'custom-web-applications',
    label: 'Custom Web Applications',
    icon: <Globe className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
  {
    value: 'custom-mobile-applications',
    label: 'Custom Mobile Applications',
    icon: <Smartphone className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
  {
    value: 'brand-identity',
    label: 'Brand Identity',
    icon: <BadgePercent className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
  {
    value: 'logo-design',
    label: 'Logo Design',
    icon: <PenTool className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
  {
    value: 'ui-ux-consulting',
    label: 'UI/UX Consulting',
    icon: <MonitorSmartphone className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
  {
    value: 'digital-product-strategy',
    label: 'Digital Product Strategy',
    icon: <Lightbulb className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
  {
    value: 'general-consulting',
    label: 'General Consulting',
    icon: <Users className="inline w-4 h-4 mr-2 text-[#fcba04]" />,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    service: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setFormData({ ...formData, service: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const { error } = await supabase
      .from('contacts')
      .insert([formData]);

    if (error) {
      console.error('Error submitting form:', error);
      setStatus('Failed to send message. Please try again.');
    } else {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '', service: '' });
    }
  };

  // For showing icon in select
  const selectedServiceObj = SERVICE_OPTIONS.find(
    (opt) => opt.value === formData.service
  );

  return (
    <section className='min-h-screen mx-auto max-w-6xl  py-20 px-8 lg:px-0 flex flex-col justify-center items-center'>
      <h3
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='font-black capitalize animate-fade-up text-center underline underline-offset-4 decoration-[#FCBA04] decoration-wavy'>
        get in touch
      </h3>

      <p className='w-full lg:w-[600px] text-center'>I am excited to hear from you and get to create something amazing together. Reach out for any inquiry.</p>

      <h4 className='pt-5 font-black text-center'>Reach out directly:</h4>

      <p className='flex items-center gap-1.5 text-center'><FaEnvelope className='text-[#fcba04]' />: info@odhiambolvis.tech </p>

      <p className='flex items-center gap-1.5 text-center'><MdOutlineLocalPhone className='text-[#fcba04]' />: (254) 718-505-642</p>

      <p className='uppercase pt-3 text-center text-[#fcba04] font-bold'>(mon - fri: 8am - 5pm eat)</p>

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

      <div className="w-full lg:w-[600px] mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border-b border-t-0 border-l-0 border-r-0 focus:border-b-2 focus:border-[#fcba04] focus:ring-0 transition-colors duration-200 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border-b border-t-0 border-l-0 border-r-0 focus:border-b-2 focus:border-[#fcba04] focus:ring-0 transition-colors duration-200 outline-none"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="p-3 border-b border-t-0 border-l-0 border-r-0 focus:border-b-2 focus:border-[#fcba04] focus:ring-0 transition-colors duration-200 outline-none"
          />

          {/* Custom select with lucide-react icons for services */}
          <div className="relative">
            <select
              name="service"
              value={formData.service}
              onChange={handleServiceChange}
              required
              className="p-3 pr-10 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fcba04] appearance-none w-full"
            >
              <option value="" disabled>Select a service</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* Icon Preview: show left of select when chosen */}
            {selectedServiceObj && (
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                {selectedServiceObj.icon}
              </span>
            )}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#fcba04]">
              {/* Chevron Down from Lucide */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 border-b border-t-0 border-l-0 border-r-0 focus:border-b-2 focus:border-[#fcba04] focus:ring-0 transition-colors duration-200 outline-none"
          ></textarea>

          <button
            type="submit"
            className="bg-[#000000] text-white font-bold py-3 px-6 uppercase rounded-md hover:bg-[#e0a800] hover:text-[#000000] transition duration-300 cursor-pointer"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-center text-lg">{status}</p>}
      </div>
    </section>
  )
}

export default Contact;