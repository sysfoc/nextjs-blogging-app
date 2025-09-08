import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
      <div className='py-16 flex items-center justify-center'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='font-bold text-3xl text-white text-center capitalize'>
            Exploring the Net Worth of Leaders, Icons and Famous
          </h1>
          <div className='flex justify-center items-center text-white gap-x-2'>
            <Link href='/'>
              <span>Home / </span>
            </Link>
            <span className='capitalize'>blogs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
