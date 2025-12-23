import Image from "next/image";
import Link from "next/link";
import { FaFireFlameCurved } from "react-icons/fa6";

interface PopularProps {
  data: any;
  loading: boolean;
}
const Popular = ({ data: blogs, loading }: PopularProps) => {
  return (
    <div className='px-4 border border-gray-200 rounded-xl'>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <FaFireFlameCurved size={20} className='mr-2 text-[#FE4F70]' />
          <h2 className='text-xl font-bold'>Popular Posts</h2>
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
      <div className='mt-4 flex flex-col'>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='flex items-center justify-center gap-x-2 mb-4'
              >
                <div className='w-[65px] h-[65px] rounded-full bg-gray-200 animate-pulse'></div>
                <div className='flex flex-col gap-y-1'>
                  <div className='w-[250px] h-4 bg-gray-200 animate-pulse rounded'></div>
                  <div className='w-[180px] h-3 bg-gray-200 animate-pulse rounded'></div>
                </div>
              </div>
            ))
          : blogs?.slice(0, 4)?.map((post: any, index: number) => (
              <div
                key={index}
                className='flex items-center gap-x-5 border-t border-gray-200/70 py-4'
              >
                <div className='w-[65px] h-[65px] rounded-full overflow-hidden relative shrink-0'>
                  <Image
                    src={`/posts/images/${post?.image}`}
                    alt={`${post?.title}-img`}
                    fill
                    className='object-cover'
                    sizes='65px'
                    quality={75}
                    priority={index < 2}
                  />
                </div>
                <div>
                  <Link
                    href={`/category/${post?.category?.slug}/${post?.subCategory?.slug}/${post?.slug}`}
                  >
                    <h3 className='font-bold'>{post?.title}</h3>
                  </Link>
                  <p className='text-xs text-gray-800 md:text-gray-600 mt-1'>
                    {new Date(
                      post?.created_at.replace(" ", "T")
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Popular;