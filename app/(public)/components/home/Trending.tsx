"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: any;
  loading: boolean;
}
const Trending = ({ data: blogs, loading }: Props) => {
  return (
    <section className='mt-12'>
      <div className='my-4'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>Trending</h3>
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
      <div className='border border-gray-200/70 rounded-xl'>
        <div className='p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5'>
            {blogs?.slice(0, 2)?.map((post: any, index: number) => (
              <div key={index} className='relative'>
                <div className='absolute top-4 left-4'>
                  <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize'>
                    {post?.category?.name}
                  </button>
                </div>
                <div>
                  <Image
                    src={post?.image}
                    alt={`${post?.title}-img`}
                    width={300}
                    height={300}
                    className='size-full rounded-xl'
                  />
                </div>
                <div className='my-3 flex items-center gap-x-5'>
                  <div className='flex items-center gap-x-3'>
                    <div className='relative w-8 h-8'>
                      <Image
                        src='/blog-img.jpg'
                        alt='profile'
                        fill
                        className='object-cover rounded-full'
                      />
                    </div>
                    <p className='text-sm font-semibold'>{post?.blogWriter}</p>
                  </div>
                  <div className='w-1 h-1 rounded-full bg-[#FE4F70]' />
                  <p className='text-sm'>
                    {new Date(post?.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/category/${post?.category?.slug}/${post?.subCategory?.slug}/${post?.slug}`}
                  >
                    <h4 className='font-bold text-xl'>{post?.title}</h4>
                  </Link>
                  <p className='mt-2 text-gray-500'>
                    {post?.content?.slice(3, 100)}
                  </p>
                </div>
              </div>
            ))}
            <div className='md:col-span-2'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
                {blogs?.slice(2, 6)?.map((post: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center gap-x-5 pb-4 pt-4 border-t border-gray-200/70
                    `}
                  >
                    <div className='w-[100px] h-[80px] rounded-md overflow-hidden relative shrink-0'>
                      <Image
                        src={post?.image}
                        alt={`${post?.title}-img`}
                        fill
                        className='object-cover'
                        fetchPriority='high'
                        priority
                      />
                    </div>
                    <div>
                      <Link
                        href={`/category/${post?.category?.slug}/${post?.subCategory?.slug}/${post?.slug}`}
                      >
                        <h3 className='font-bold'>{post?.title}</h3>
                      </Link>
                      <p className='text-xs text-gray-400 mt-1'>
                        {new Date(post?.createdAt).toLocaleDateString("en-US", {
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending;
