import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const sections = [
    {
        title: "My Offer",
        content: (
            <div>
                <img src="/offer.png" style={{width:'calc(25em + 4vw)'}}/>

                <p className="pt-4">
                    I provide a comprehensive suite of digital services, including web and mobile app development, UI/UX design, branding, and digital strategy. My solutions are tailored to help you stand out and grow your business and brand.
                </p>

                <ul className="pl-5 mt-3">
                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>Custom Web & Mobile Apps</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>Brand Identity & Logo Design</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>UI/UX Consulting</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>Digital Product Strategy</span>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        title: "Key Features",
        content: (
            <div>
                <img src="/features.png" style={{width:'calc(25em + 4vw)'}}/>

                <ul className="space-y-2 pt-4">
                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>Responsive, mobile-first design</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>Modern tech stack (React, Node.js, Tailwind, etc.)</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>SEO & performance optimization</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-[#FCBA04]" />
                        <span>Ongoing support & maintenance</span>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        title: "Pricing",
        content: (
            <div>
                <h4 className="font-semibold text-lg mb-2">Flexible Pricing</h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-5">
                    <div className="rounded-xl border border-[#FCBA04] bg-white p-4 shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-[#FCBA04] cursor-pointer">
                        <h5 className="font-bold text-[#FCBA04] mb-1">Starter</h5>

                        <h4 className="font-black mb-2">Ksh. 20,000 +</h4>

                        <ul className="mb-2 list-disc">
                            <li>1-2 page website</li>
                            <li>Basic branding</li>
                            <li>Basic SEO</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border-2 border-[#FCBA04] bg-[#FCBA04]/10 p-4 shadow-lg flex flex-col items-center scale-105 transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:border-4 hover:border-[#FCBA04] cursor-pointer">
                        <h5 className="font-bold text-[#FCBA04] mb-1">Pro</h5>

                        <h4 className="font-black mb-2">Ksh. 85,000 +</h4>

                        <ul className="mb-2 list-disc">
                            <li>Up to 6 pages</li>
                            <li>Custom design</li>
                            <li>Advanced SEO</li>
                            <li>Priority support</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-[#FCBA04] bg-white p-4 shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-[#FCBA04] cursor-pointer">
                        <h5 className="font-bold text-[#FCBA04] text-xl mb-1">Enterprise</h5>

                        <h4 className="font-black mb-2">Custom</h4>

                        <ul className="mb-2 list-disc">
                            <li>Full-stack solutions</li>
                            <li>Integrations & APIs</li>
                            <li>Dedicated support</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-7 text-center">* All packages are customizable. Let's discuss your needs!</p>
            </div>
        ),
    },
];

const ServicePack = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleSection = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="pt-12">
            <motion.h3
                className="font-black text-2xl text-gray-900 mb-6 flex items-center gap-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Services & Packages
            </motion.h3>

            <section className="w-full flex flex-col md:flex-row overflow-hidden">
                {/* Left side: Dropdowns */}
                <div className="w-full md:w-1/3 bg-white p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className={`mb-2 transition-all duration-300 ${activeIndex === index
                                ? "bg-[#FCBA04]/10 border-l-4 border-[#FCBA04] shadow"
                                : ""
                                } rounded-0`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <button
                                onClick={() => toggleSection(index)}
                                className={`flex justify-between items-center w-full px-4 py-3 text-left transition font-bold text-gray-900 cursor-pointer ${activeIndex === index
                                    ? "bg-[#FCBA04]/20"
                                    : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                aria-expanded={activeIndex === index}
                                aria-controls={`service-section-${index}`}
                            >
                                <span className="">{section.title}</span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-2"
                                >
                                    <ChevronDown />
                                </motion.div>
                            </button>

                            {/* Show dropdown content only on mobile */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        id={`service-section-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="md:hidden overflow-hidden px-4 py-3 bg-white rounded-b-xl border-t border-gray-100"
                                    >
                                        {section.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Right side: Content (desktop only) */}
                <div className="hidden md:flex w-2/3 p-8 items-center justify-center transition-colors duration-300">
                    {activeIndex !== null ? (
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-800 w-full"
                        >
                            {sections[activeIndex].content}
                        </motion.div>
                    ) : (
                        <p className="italic">Select a tab to see content</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ServicePack;