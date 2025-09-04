import Link from "next/link";
import React from "react";

interface Props {
  categoryInfo: any;
  parentCategory: string;
}
const HeroSection = ({ categoryInfo, parentCategory }: Props) => {
  return (
    <section className='bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800'>
      <div className='py-16 flex items-center justify-center'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='font-bold text-3xl text-white text-center capitalize'>{categoryInfo?.h1Title}</h1>
          <div className='flex justify-center items-center text-white gap-x-2'>
            <Link href='/'>
              <span>Home / </span>
            </Link>
            <span className='capitalize'>category / </span>
            <span className='capitalize'>{parentCategory} / </span>
            <span className='capitalize'>{categoryInfo?.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
