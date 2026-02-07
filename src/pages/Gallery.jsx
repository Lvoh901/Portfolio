import React, { useState } from 'react';
import HeaderImg from '/designs/headerImg.webp';
import { FaPaintBrush, FaTags, FaMobileAlt, FaNewspaper, FaLaptopCode } from 'react-icons/fa';

// Add an 'images' array for each category (replace these with real paths later)
const serviceTypes = [
  // {
  //   number: '01',
  //   title: 'Logo Folio',
  //   color: 'from-amber-100 to-yellow-100',
  //   icon: <FaPaintBrush />,
  //   content: 'My logofolio highlights custom logos designed with a focus on client vision and interest.',
  //   images: [
  //     '/gallery/logo1.webp',
  //     '/gallery/logo2.webp',
  //     '/gallery/logo3.webp'
  //   ]
  // },
  // {
  //   number: '02',
  //   title: 'Branding Design',
  //   color: 'from-blue-100 to-blue-200',
  //   icon: <FaTags />,
  //   content: 'This section highlights high impact visuals identifying addressing Vision, Mission, and goals of companies.',
  //   images: [
  //     '/gallery/brand1.webp',
  //     '/gallery/brand2.webp'
  //   ]
  // },
  {
    number: '03',
    title: 'Social Media',
    color: 'from-pink-100 to-pink-200',
    icon: <FaMobileAlt />,
    content: 'My social media design projects featured in Facebook, Twitter, and LinkedIn in different accounts both public and personal accounts.',
    images: [
      '/designs/social_media1.png',
      '/designs/social_media2.png',
      '/designs/social_media3.png',
      '/designs/social_media4.jpg',
      '/designs/social_media5.jpg',
      '/designs/social_media6.jpg',
      '/designs/social_media7.jpg',
      '/designs/social_media8.jpg',
      '/designs/social_media9.jpg',
      '/designs/social_media10.png',
      '/designs/social_media11.webp',
      '/designs/social_media12.png',
    ]
  },
  // {
  //   number: '04',
  //   title: 'Print Media',
  //   color: 'from-green-100 to-teal-100',
  //   icon: <FaNewspaper />,
  //   content: 'Delve into my print media design work t enhance offline brand presence.',
  //   images: [
  //     '/gallery/print1.webp',
  //     '/gallery/print2.webp'
  //   ]
  // },
  // {
  //   number: '05',
  //   title: 'UI/UX Design',
  //   color: 'from-purple-100 to-indigo-100',
  //   icon: <FaLaptopCode />,
  //   content: 'Seamless UI/UX for applications and websites that combines clarity, visual appeal, and usability.',
  //   images: [
  //     '/gallery/uiux1.webp',
  //     '/gallery/uiux2.webp',
  //     '/gallery/uiux3.webp'
  //   ]
  // },
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState(serviceTypes[0].number);

  const activeService = serviceTypes.find(service => service.number === activeTab);

  return (
    <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen">
      <section className="flex flex-col items-center mb-8">
        <img
          src={HeaderImg}
          alt="Gallery Header"
          className="w-full object-cover rounded-b-xl shadow-lg mb-6 mt-2"
        />
      </section>

      {/* Responsive Tabs for Service Types */}
      <section className="container mx-auto px-8 mb-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
          {serviceTypes.map((service) => (
            <button
              key={service.number}
              onClick={() => setActiveTab(service.number)}
              className={`
                px-5 py-2 rounded-md transition-all duration-300 cursor-pointer flex gap-2.5 items-center
                ${activeTab === service.number
                  ? 'bg-[#FCBA04] text-white shadow-md font-bold uppercase'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 font-semibold'
                }
              `}
            >
              {service.icon} {service.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-2.5">
          <h3 className="font-bold text-gray-800 mb-4 flex flex-col">
            {activeService.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-center md:text-left mb-6">
            {activeService.content}
          </p>

          {/* Display images for the active category */}
          {activeService.images && activeService.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-8 justify-center">
              {activeService.images.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg shadow border border-gray-50 bg-white flex items-center justify-center hover:shadow-md hover:shadow-[#fcba04] cursor-pointer">
                  <img
                    src={img}
                    alt={`${activeService.title} ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;