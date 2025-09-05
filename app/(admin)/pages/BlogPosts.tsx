import React from "react";
import Table from "@/app/(admin)/components/blog-posts/Table";
import Link from "next/link";

const BlogPosts = () => {
  return (
    <section className='my-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Blog Lists</h1>
        </div>
        <div>
          <Link
            href={"/admin/blog-posts/create"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Create Blog
          </Link>
        </div>
      </div>
      <Table />
    </section>
  );
};

export default BlogPosts;
