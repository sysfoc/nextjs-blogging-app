import React from "react";
import EditPosts from "../components/posts/EditPost";
import Link from "next/link";

const EditPost = () => {
  return (
    <section className='my-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Update Post</h1>
        </div>
        <div>
          <Link
            href={"/admin/posts"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Go Back
          </Link>
        </div>
      </div>
      <EditPosts />
    </section>
  );
};

export default EditPost;
