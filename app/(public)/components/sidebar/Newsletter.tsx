import Link from "next/link";
import React from "react";
import { FaFireFlameCurved } from "react-icons/fa6";

const Newsletter = () => {
  return (
    <div className='px-4 border border-gray-200 rounded-xl'>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <FaFireFlameCurved size={20} className='mr-2 text-[#FE4F70]' />
          <h2 className='text-xl font-bold'>Newsletter</h2>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='https://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#FE4F70'></stop>
                <stop offset='100%' stopColor='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              strokeWidth='2'
              fill='none'
            ></path>
          </svg>
        </div>
      </div>
      <div className='my-6'>
        <h3 className='text-sm text-center font-semibold'>
          Join 70,000 subscribers!
        </h3>
        <form className='my-3'>
          <input
            type='email'
            placeholder='Email Address'
            className='w-full border border-gray-200/70 rounded-full px-4 py-2 mt-2 text-center placeholder:text-center placeholder:text-sm'
          />
          <button
            type='submit'
            className='cursor-pointer w-full bg-[#FE4F70] text-white rounded-full px-4 py-2 mt-2 text-sm'
          >
            Subscribe
          </button>
        </form>
        <p className='text-xs text-center mt-2'>
          By signing up, you agree to our{" "}
          <Link href={"/"} className='text-[#FE4F70]'>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
