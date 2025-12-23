import Link from "next/link";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  data: any;
  loading: boolean;
}

const Categories = ({ data: categories, loading }: Props) => {
  return (
    <div className='px-4 border border-gray-200 rounded-xl'>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <FaFireFlameCurved size={20} className='mr-2 text-[#FE4F70]' />
          <h2 className='text-xl font-bold'>Categories</h2>
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
      <div className='my-4 flex flex-col'>
        {loading ? (
          <div className='flex flex-col gap-y-3 mb-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='flex items-center gap-x-4 border-t border-gray-200/70 py-3'
              >
                <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse' />
                <div className='w-32 h-4 bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>
        ) : (
          categories?.map((category: any, index: number) => (
            <Link
              href={`/category/${category?.slug}`}
              key={index}
              className='flex items-center gap-x-4 border-t border-gray-200/70 py-3 transition-colors'
            >
              <IoIosArrowForward size={18} className='text-[#FE4F70]' />
              <h2 className='text-sm font-semibold capitalize'>
                {category?.name}
              </h2>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;