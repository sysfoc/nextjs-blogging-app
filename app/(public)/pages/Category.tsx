"use client";
import React, { useEffect } from "react";
import HeroSection from "@/app/(public)/components/category/HeroSection";
import CategoryPosts from "@/app/(public)/components/category/CategoryPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";

interface Props {
  categoryInfo: any;
}
const Category = ({ categoryInfo }: Props) => {
  const [blog, setBlogs] = React.useState<any[]>([]);
  const fetchBlogs = async () => {
    try {
      const blogRes = await fetch(
        `/api/v1/blog/get-by-category/${categoryInfo._id}`,
        { method: "GET", credentials: "include" }
      );
      if (!blogRes.ok) throw new Error("Failed to load blogs");
      const blogData = await blogRes.json();

      setBlogs(blogData.blogs ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <HeroSection categoryInfo={categoryInfo} />
      <section className='mx-4 md:mx-12 my-8 flex justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <CategoryPosts blogs={blog} />
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default Category;
