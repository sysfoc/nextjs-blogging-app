"use client";
import React, { useEffect } from "react";
import HeroSection from "@/app/(public)/components/subcategory/HeroSection";
import SubCatPosts from "@/app/(public)/components/subcategory/SubCatPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import { useParams } from "next/navigation";
const SubCategory = () => {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = React.useState({
    _id: "",
    name: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });
  const params = useParams();

  const fetchBlogs = async () => {
    try {
      const categoryRes = await fetch(
        `/api/v1/sub-category/get-by-name/${params.subcategory}`,
        { method: "GET", credentials: "include" }
      );
      if (!categoryRes.ok) throw new Error("Failed to load category");
      const categoryData = await categoryRes.json();
      setCategoryInfo(categoryData.subCategory);
      const blogRes = await fetch(
        `/api/v1/blog/get-by-subcategory/${categoryData.subCategory._id}`,
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
      <HeroSection parentCategory={params.category as string} categoryInfo={categoryInfo} />
      <section className='mx-4 md:mx-12 my-8 flex justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <SubCatPosts blogs={blogs}/>
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default SubCategory;
