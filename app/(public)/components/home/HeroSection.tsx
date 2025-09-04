"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  const getLatestBlogs = async () => {
    try {
      const blogRes = await fetch(`/api/v1/blog/get/latest-posts`, {
        method: "GET",
        credentials: "include",
      });
      if (!blogRes.ok) throw new Error("Failed to load blogs");
      const blogData = await blogRes.json();
      setBlogs(blogData.blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLatestBlogs();
  }, []);

  return (
    <div>
      {blogs?.slice(0, 1).map((blog, index) => (
        <div
          key={index}
          className='relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl group'
        >
          <Image
            src={blog?.image}
            alt={`${blog?.title}-img`}
            fill
            className='object-cover rounded-xl group-hover:scale-105 transition-all duration-500 ease-in-out'
            priority
            fetchPriority='high'
          />
          <div className='absolute inset-0 bg-black/40 rounded-xl' />
          <div className='absolute inset-0 flex flex-col gap-y-5 justify-end p-5 md:p-10 text-white'>
            <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize'>
              {blog?.subCategory?.name}
            </button>
            <Link href={`/category/${blog?.category?.name}/${blog?.subCategory?.name}/${blog?.slug}`}>
              <h1 className='font-bold text-2xl'>{blog?.title}</h1>
            </Link>
            <div className='flex items-center gap-x-5'>
              <p className='text-sm'>{blog?.blogWriter}</p>
              <div className='w-1 h-1 rounded-full bg-white' />
              <p className='text-sm'>
                {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
