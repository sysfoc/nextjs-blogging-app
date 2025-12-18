import Link from "next/link";
import React from "react";
import UpdateSubCategory from "@/app/(admin)/components/sub-category/EditSubCat";

const EditSubCat = () => {
  return (
    <section className='my-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>
            Update Sub Category
          </h1>
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
      <UpdateSubCategory />
    </section>
  );
};

export default EditSubCat;
