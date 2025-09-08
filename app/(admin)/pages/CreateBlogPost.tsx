import React from "react";
import AddBlogPost from "@/app/(admin)/components/blog-posts/AddBlogPost";
import Link from "next/link";

const CreateBlogPost = () => {
  return (
    <section className='my-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>
            Create new Blog post
          </h1>
        </div>
        <div>
          <Link
            href={"/admin/blog-posts"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Go Back
          </Link>
        </div>
      </div>
      <AddBlogPost />
    </section>
  );
};

export default CreateBlogPost;
