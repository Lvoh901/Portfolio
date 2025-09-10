import React from 'react'
import { BiHomeSmile } from 'react-icons/bi';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-white to-[#fcba04]/10 p-8" id="heading">
            <div className="flex flex-col items-center gap-4 w-full">
                <img
                    src="/deadpool.webp"
                    alt="Deadpool lost"
                    className="rounded-2xl shadow-lg border-4 border-[#fcba04]/30 mb-2 animate-bounce-slow"
                    style={{ width: 'clamp(18em, 30vw, 32em)' }}
                />
                <div className="font-black text-6xl md:text-7xl lg:text-8xl text-[#fcba04] drop-shadow-lg tracking-widest select-none">
                    404
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mt-2">
                    Page Not Found
                </h2>
                <p className="mx-auto max-w-2xl text-center text-gray-600 dark:text-gray-300 text-lg md:text-xl mt-2">
                    Oops! It looks like you've taken a wrong turn somewhere... <br />
                    But don't worry, Deadpool will help you get back on track!
                </p>
                <a
                    href="/"
                    className="mt-8 flex items-center gap-2 px-6 py-3 bg-[#fcba04] text-black font-bold rounded-full shadow-md hover:bg-black hover:text-[#fcba04] transition-colors duration-300 text-lg group"
                >
                    <BiHomeSmile className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
                    <span>Back to Home</span>
                </a>
            </div>
        </div>
    )
}

export default NotFound;