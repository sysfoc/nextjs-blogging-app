import React from "react";
import UpdateBlog from "@/app/(admin)/components/blogs/EditBlog";
import Link from "next/link";

const EditBlog = () => {
  return (
    <section className='my-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Update Blog</h1>
        </div>
        <div>
          <Link
            href={"/admin/blogs"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Go Back
          </Link>
        </div>
      </div>
      <UpdateBlog />
    </section>
  );
};

export default EditBlog;
