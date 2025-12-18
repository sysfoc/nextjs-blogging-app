import React from 'react'
import AddUser from '@/app/(admin)/components/users/AddUser'
import Link from 'next/link'

const CreateUser = () => {
  return (
    <section className='my-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Create new Users</h1>
        </div>
        <div>
          <Link
            href={"/admin/users"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Go Back
          </Link>
        </div>
      </div>
      <AddUser />
    </section>
  )
}

export default CreateUser