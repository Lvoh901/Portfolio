// "use client";
import { motion } from "framer-motion";

const steps = [
    {
        id: 1,
        title: "Discover & Align",
        desc: "We dive into your idea, goals, and requirements to make sure we're crystal clear on your vision and targets.",
    },
    {
        id: 2,
        title: "Strategy & Preview",
        desc: "I map out a project plan, architecture, and provide wireframes or mockups so you see the approach before development starts.",
    },
    {
        id: 3,
        title: "Build & Feedback",
        desc: "Development happens in focused, visible stages. You'll get regular previews, updates, and opportunities for feedback.",
    },
    {
        id: 4,
        title: "Launch & Support",
        desc: "Once ready, your product is deployed, handed over with documentation, and I stay available for post-launch support.",
    },
];

export default function Process() {
    return (
        <div className="w-full min-h-screen bg-gray-200 py-20 px-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none" />

            {/* Title */}
            <div className="mb-8 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-bold tracking-tight"
                >
                    My Onboarding Process
                </motion.h3>

                <p>Your idea comes to life in 4 simple steps.</p>
            </div>

            {/* Ordered List */}
            <motion.ol
                className="max-w-2xl mx-auto flex flex-col gap-5"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.14 } }
                }}
            >
                {steps.map((step, index) => (
                    <motion.li
                        key={step.id}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: index * 0.1,
                            ease: "easeOut",
                        }}
                        className="bg-gray-700 rounded-xl px-6 py-8 shadow-md group hover:bg-[#FCBA04] transition-colors duration-300 cursor-pointer"
                    >
                        <div className="flex items-start gap-6">
                            <h1 className="bg-gray-300 rounded-full w-12 h-12 shrink-0 italic flex justify-center items-center border-2 border-[#FCBA04]">{step.id}</h1>

                            <div>
                                <h4 className="text-xl font-semibold mb-2 text-[#FCBA04] group-hover:text-black transition-colors duration-300">
                                    {step.title}
                                </h4>
                                <p className="text-white group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </motion.ol>

            {/* Futuristic Line */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-[5px] bg-[#FCBA04] mt-12 mx-auto max-w-5xl"
            />
        </div>
    );
}
