import Link from "next/link";
import React from "react";
import AddSubCat from "@/app/(admin)/components/sub-category/AddSubCat";

const CreateSubCat = () => {
  return (
    <section className='my-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Create new Sub Category</h1>
        </div>
        <div>
          <Link
            href={"/admin/sub-category"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Go Back
          </Link>
        </div>
      </div>
      <AddSubCat />
    </section>
  );
};

export default CreateSubCat;
