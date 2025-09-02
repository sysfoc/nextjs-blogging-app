import React from "react";

const Tags = () => {
  return (
    <div className='px-4 border border-gray-200 rounded-xl'>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <svg
            stroke='currentColor'
            fill='currentColor'
            stroke-width='0'
            viewBox='0 0 384 512'
            className='mr-2 text-[#FE4F70]'
            height='20'
            width='20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z'></path>
          </svg>
          <h2 className='text-xl font-bold'>Tags</h2>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stop-color='#FE4F70'></stop>
                <stop offset='100%' stop-color='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              stroke-width='2'
              fill='none'
            ></path>
          </svg>
        </div>
      </div>
      <div className='my-6'>
        <div className='flex flex-wrap gap-3'>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Audio
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Content
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Featured
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Image
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Inpiration
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Lifestyle
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Photo
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Pick
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Slide
          </p>
          <p className='text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full'>
            #Trending
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tags;
