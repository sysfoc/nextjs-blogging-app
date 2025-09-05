import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostProps {
  data: any;
}
const LatestPosts = ({ data }: PostProps) => {
  return (
    <section className='mt-12'>
      {data?.map((post: any, index: number) => (
        <div key={index}>
          <div className='my-4'>
            <div className='flex items-center'>
              <h3 className='text-2xl font-bold capitalize'>{post.name}</h3>
            </div>
            <div className='mt-2'>
              <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient
                    id='gradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='0%'
                  >
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
          <div>
            <div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
                {post?.blogs?.map((sub: any, index: number) => (
                  <div
                    key={index}
                    className='border border-gray-200/70 rounded-xl'
                  >
                    <div className='w-full h-[200px] rounded-md overflow-hidden relative shrink-0'>
                      <Image
                        src={`${sub?.image}`}
                        alt={`${sub?.title}-img`}
                        fill
                        className='object-cover'
                        fetchPriority='high'
                        priority
                      />
                      <div className='absolute top-4 left-4'>
                        <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize'>
                          {sub?.subCategory?.name}
                        </button>
                      </div>
                    </div>
                    <div className='px-4 py-2'>
                      <Link
                        href={`/category/${post?.slug}/${sub?.subCategory?.name}/${sub?.slug}`}
                      >
                        <h3 className='font-bold text-lg'>
                          {sub?.title.slice(0, 45)}...
                        </h3>
                      </Link>
                      <div className='my-3 flex items-center justify-between gap-x-3'>
                        <p className='text-sm'>By {sub?.blogWriter}</p>
                        <div className='w-1 h-1 rounded-full bg-[#FE4F70]' />
                        <p className='text-sm'>
                          {new Date(sub?.createdAt).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default LatestPosts;
