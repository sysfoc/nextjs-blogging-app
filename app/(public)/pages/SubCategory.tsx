"use client";
import React, { useEffect } from "react";
import HeroSection from "@/app/(public)/components/subcategory/HeroSection";
import SubCatPosts from "@/app/(public)/components/subcategory/SubCatPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import { useParams } from "next/navigation";

interface Props {
  subCategoryInfo: any;
}
const SubCategory = ({ subCategoryInfo }: Props) => {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const params = useParams();

  const fetchBlogs = async () => {
    try {
      const blogRes = await fetch(
        `/api/v1/blog/get-by-subcategory/${subCategoryInfo._id}`,
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
      <HeroSection
        parentCategory={params.category as string}
        categoryInfo={subCategoryInfo}
      />
      <section className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <SubCatPosts blogs={blogs} />
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default SubCategory;
