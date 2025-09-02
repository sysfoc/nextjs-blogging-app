import React from "react";
import HeroSection from "@/app/(public)/components/category/HeroSection";
import CategoryPosts from "@/app/(public)/components/category/CategoryPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";

const Category = () => {
  return (
    <div>
      <HeroSection />
      <section className='mx-4 md:mx-12 my-8 flex justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <CategoryPosts />
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default Category;
