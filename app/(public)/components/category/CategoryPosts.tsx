"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  blogs: any[];
  category: string;
}
const CategoryPosts = ({ blogs: data, category }: Props) => {
  return (
    <div className='border border-gray-200/70 rounded-xl'>
      <div className='p-4'>
        <div className='flex flex-col'>
          {data?.map((post, index) => (
            <div
              key={post?._id}
              className={`flex items-center flex-wrap md:flex-nowrap gap-x-5 pb-4 ${
                index !== 0 ? "pt-4 border-t border-gray-200/70" : ""
              }`}
            >
              <div className='w-full md:w-[300px] h-[300px] md:h-[200px] rounded-md overflow-hidden relative shrink-0'>
                <Image
                  src={`${post?.image}`}
                  alt='blog-image'
                  fill
                  className='object-cover'
                  fetchPriority='high'
                  priority
                />
                <div className='absolute top-4 left-4'>
                  <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize'>
                    {category}
                  </button>
                </div>
              </div>
              <div>
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
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Link href='/'>
                  <h3 className='font-bold text-xl'>{post?.title}</h3>
                </Link>
                <p className='text-gray-400 my-2'>
                  {post?.content.slice(3, 100)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts;
