import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CommentSection = () => {
  return (
    <section className='mt-12'>
      <div className='my-4'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>Leave a Comment</h3>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#FE4F70'></stop>
                <stop offset='100%' stopColor='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              strokeWidth='2'
              fill='none'
            ></path>
          </svg>
        </div>
      </div>
      <form className='my-6 flex flex-col gap-y-4'>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            autoComplete='name'
            placeholder='Enter your name'
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            autoComplete='email'
            placeholder='Enter your email'
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='comment'>Comment*</Label>
          <Textarea
            id='comment'
            name='comment'
            placeholder='Enter your comment'
            className='min-h-[100px]'
          />
        </div>
        <div>
          <button
            type='submit'
            className='cursor-pointer w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm'
          >
            Post Comment
          </button>
        </div>
      </form>
      <div className='mt-12'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>Comments</h3>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#FE4F70'></stop>
                <stop offset='100%' stopColor='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              strokeWidth='2'
              fill='none'
            ></path>
          </svg>
        </div>
        <div className='mt-4 flex flex-col gap-y-4'>
          <div className='border border-gray-200 rounded-xl p-4'>
            <div className='flex items-center gap-x-2'>
              <h4 className='text-lg font-bold'>John Doe</h4>
              <span className='text-xs text-gray-500'>
                (September 23, 2023)
              </span>
            </div>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              impedit voluptates, quae perferendis illo est alias dicta
              reprehenderit eaque tempore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
