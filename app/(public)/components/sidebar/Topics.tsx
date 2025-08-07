import React from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const TopicsData = [
  {
    id: 1,
    title: "Fashion",
    count: 10,
  },
  {
    id: 2,
    title: "Beauty",
    count: 10,
  },
  {
    id: 3,
    title: "Style",
    count: 10,
  },
  {
    id: 4,
    title: "Technology",
    count: 10,
  },
  {
    id: 5,
    title: "Health",
    count: 10,
  },
  {
    id: 6,
    title: "Travel",
    count: 10,
  },
];
const Topics = () => {
  return (
    <div className='px-4 border border-gray-200 rounded-xl'>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <FaFireFlameCurved size={20} className='mr-2 text-[#FE4F70]' />
          <h2 className='text-xl font-bold'>Explore Topics</h2>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
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
      <div className='my-4 flex flex-col'>
        {TopicsData?.map((topic) => (
          <div
            key={topic?.id}
            className='flex items-center justify-between border-t border-gray-200/70 py-3 cursor-pointer'
          >
            <div className='flex items-center gap-x-4'>
              <IoIosArrowForward size={18} className='text-[#FE4F70]' />
              <h2 className='text-sm font-semibold'>{topic?.title}</h2>
            </div>
            <div>
              <span className='text-sm'>({topic?.count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
