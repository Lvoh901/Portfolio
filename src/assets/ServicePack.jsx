import { motion } from "framer-motion";

const servicesList = [
    {
        img: "./development.jpg",
        name: "Custom Web/ Mobile Application",
        description: "Get a fast, sleek website or app custom-built to power your ideas and business."
    },
    {
        img: "./brand.jpg",
        name: "Brand Identity/ Logo Design",
        description: "Stand out with a memorable logo and a striking, tailor-made brand identity."
    },
    {
        img: "./ui_ux.jpg",
        name: "UI/UX Design/ Consulting",
        description: "Delight your users with beautiful, intuitive designs that drive results."
    },
    {
        img: "./digital.jpg",
        name: "Digital Product Strategy",
        description: "Transform your vision into digital success with expert strategy and guidance."
    }
];

const ServicePack = () => (
    <section>
        <div className="max-w-5xl mx-auto p-8">
            <motion.h3
                className="font-black text-center mb-2 gap-2 underline underline-offset-4 decoration-wavy decoration-[#FCBA04]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Services & Packages
            </motion.h3>

            <p className="pb-4 text-center">
                I provide a comprehensive suite of digital services, including web and mobile app development, UI/UX design, branding, and digital strategy. My solutions are tailored to help you stand out and grow your business and brand.
            </p>

            {/* Service Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-4 mb-10">
                {servicesList.map((service, idx) => (
                    <motion.div
                        key={service.name}
                        className="relative overflow-hidden rounded-lg shadow-md cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.035, boxShadow: '0 16px 32px 0 rgba(252,186,4,0.11)' }}
                        transition={{ duration: 0.5, delay: idx * 0.14, type: 'spring', stiffness: 200, damping: 16 }}
                        viewport={{ once: true }}
                    >
                        {service.img && (
                            <motion.img
                                src={service.img}
                                alt={service.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform"
                                whileHover={{ scale: 1.07 }}
                                transition={{ duration: 0.48 }}
                            />
                        )}

                        {/* Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-gray-700/30 pointer-events-none z-10"
                            whileHover={{ background: "linear-gradient(to top, rgba(252,186,4,0.25), rgba(252,186,4,0.12) 70%)" }}
                            transition={{ duration: 0.33 }}
                        ></motion.div>

                        <motion.div
                            className="relative z-20 pt-32 sm:pt-48 lg:pt-64 p-5"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.28 }}
                        >
                            <h4 className="font-bold mt-0.5 text-lg text-white">{service.name}</h4>
                            <span className="text-white/95 font-medium">{service.description}</span>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Pricing Section */}
            <h4 className="font-bold text-center tracking-wide">Flexible Pricing</h4>

            <p className="text-center text-base">
                * Every service is fully customizable to match your unique business goals. Get in touch today to discuss your project requirements and receive a tailored website or digital solution quote!
            </p>

            <div className="flex justify-center items-center mt-4">
                <button className="bg-black text-white font-bold px-4 py-2 rounded-md hover:bg-[#FCBA04] hover:text-black hover:border hover:border-black cursor-pointer">Get in Touch</button>
            </div>
        </div>
    </section>
);

export default ServicePack;