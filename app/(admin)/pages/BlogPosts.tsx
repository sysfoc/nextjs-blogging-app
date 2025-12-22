// app/(admin)/pages/BlogPosts.tsx
"use client";
import React, { useState } from "react";
import Table from "@/app/(admin)/components/blog-posts/Table";
import Link from "next/link";
import RebuildButton from "@/app/(admin)/components/RebuildButton";

const BlogPosts = () => {
  return (
    <section className='my-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Blog Lists</h1>
        </div>
        <div className="flex gap-3">
          <RebuildButton />
          <Link
            href={"/admin/blog-posts/create"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Create Blog Posts
          </Link>
        </div>
      </div>
      <Table />
    </section>
  );
};

export default BlogPosts;