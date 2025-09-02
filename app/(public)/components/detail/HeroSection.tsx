import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div
      className='relative w-full min-h-screen bg-fixed bg-center bg-cover'
      style={{ backgroundImage: "url('/banner.webp')" }}
    >
      <div className='absolute inset-0 bg-black/50' />
      <div className='absolute inset-0 w-full md:w-[70%] flex flex-col gap-y-5 justify-end p-5 md:p-16 text-white'>
        <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm'>
          Inspiration
        </button>
        <div className='flex items-center gap-x-2'>
          <Link href='/'>
            <span className='text-sm'>Home / </span>
          </Link>
          <Link href='/'>
            <span className='text-sm'>Hami / </span>
          </Link>
          <span className='text-sm '>Post 1</span>
        </div>
        <h1 className='font-bold text-4xl'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
          perspiciatis?
        </h1>
        <div className='flex items-center gap-x-5'>
          <p className='text-sm'>Hamza Ilyas</p>
          <div className='w-1 h-1 rounded-full bg-white' />
          <p className='text-sm'>March 23, 2023</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
