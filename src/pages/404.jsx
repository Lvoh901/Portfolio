import React from 'react'
import { BiHomeSmile } from 'react-icons/bi';

const NotFound = () => {
    return (
        <div className='min-h-screen p-8 mx-auto max-w-6xl flex flex-col justify-center items-center' id='heading'>
            <img src='/deadpool.webp' style={{width:'calc(30em + 15vw)'}}/>
            <div className='font-black text-5xl md:text-6xl lg:text-7xl'>404</div>

            <h4 className='mx-auto max-w-3xl text-center'>Oops! It looks like you've taken a wrong turn somewhere... but don't worry, we've got a map to get you back on track!</h4>

            <a href='/' className='pt-6 cursor-pointer'><BiHomeSmile className='w-10 h-10 hover:text-[#fcba04]'/></a>
        </div>
    )
}

export default NotFound;