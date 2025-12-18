import Link from 'next/link'
import React from 'react'
import UpdateCategory from '@/app/(admin)/components/category/EditCategory'

const EditCategory = () => {
  return (
    <section className='my-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Update User</h1>
        </div>
        <div>
          <Link
            href={"/admin/category"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Go Back
          </Link>
        </div>
      </div>
      <UpdateCategory />
    </section>
  )
}

export default EditCategory