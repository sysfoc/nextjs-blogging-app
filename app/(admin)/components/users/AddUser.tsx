import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const AddUser = () => {
  return (
    <form>
      <div className='grid grid-cols-1 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Enter Name'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='role'>Role</Label>
          <select
            name='role'
            id='role'
            className='border border-black p-1.5 rounded-md'
          >
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <button
          type='submit'
          className='w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddUser;
