import Link from 'next/link'
import React from 'react'
import Table from '@/app/(admin)/components/category/Table'
const Category = () => {
  return (
     <section className='my-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Category Lists</h1>
        </div>
        <div>
          <Link
            href={"/admin/category/create"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Create new Category
          </Link>
        </div>
      </div>
      <Table />
    </section>
  )
}

export default Category