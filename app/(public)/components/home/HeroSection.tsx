// app/(public)/components/home/HeroSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: any;
  loading: boolean;
}
const HeroSection = ({ data: blogs, loading }: Props) => {
  return (
    <div>
      {loading ? (
        <div className='relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl animate-pulse'>
          <div className='absolute inset-0 bg-gray-300 rounded-xl' />
          <div className='absolute inset-0 flex flex-col gap-y-5 justify-end p-5 md:p-10'>
            <div className='h-6 w-24 bg-gray-200 rounded-full' />
            <div className='h-8 w-3/4 bg-gray-200 rounded' />
            <div className='flex items-center gap-x-5'>
              <div className='h-4 w-20 bg-gray-200 rounded' />
              <div className='w-1 h-1 rounded-full bg-gray-300' />
              <div className='h-4 w-24 bg-gray-200 rounded' />
            </div>
          </div>
        </div>
      ) : (
        blogs?.slice(0, 1).map((blog: any, index: number) => (
          <div
            key={index}
            className='relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl group'
          >
            <Image
              src={`/posts/images/${blog?.image}`}
              alt={`${blog?.title}-img`}
              fill
              className='object-cover rounded-xl group-hover:scale-105 transition-all duration-500 ease-in-out'
              priority
              // fetchPriority='high'
              loading="eager"
            />
            <div className='absolute inset-0 bg-black/40 rounded-xl' />
            <div className='absolute inset-0 flex flex-col gap-y-5 justify-end p-5 md:p-10 text-white'>
              <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize'>
                {blog?.subCategory?.name}
              </button>
              <Link
                href={`/category/${blog?.category?.name}/${blog?.subCategory?.name}/${blog?.slug}`}
              >
                <h1 className='font-bold text-2xl'>{blog?.title}</h1>
              </Link>
              <div className='flex items-center gap-x-5'>
                <p className='text-sm'>{blog?.uploaded_by}</p>
                <div className='w-1 h-1 rounded-full bg-white' />
                <p className="text-sm">
                    {new Date(
                      blog?.created_at.replace(" ", "T")
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HeroSection;
