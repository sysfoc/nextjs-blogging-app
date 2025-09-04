"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import HeroSection from "@/app/(public)/components/detail/HeroSection";
import DetailContent from "@/app/(public)/components/detail/DetailContent";
import CommentSection from "@/app/(public)/components/detail/CommentSection";
import { useParams } from "next/navigation";

const Detail = () => {
  const params = useParams();
  const [blog, setBlog] = useState({
    content: "",
  });
  const getBlogBySlug = async () => {
    try {
      const blogRes = await fetch(`/api/v1/blog/get-by-slug/${params.slug}`, {
        method: "GET",
        credentials: "include",
      });
      if (!blogRes.ok) throw new Error("Failed to load blog");
      const blogData = await blogRes.json();

      setBlog(blogData.blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogBySlug();
  }, []);
  return (
    <section>
      <HeroSection blog={blog} />
      <section className='mx-4 md:mx-12 my-8 flex justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <DetailContent blogDetail={blog?.content} />
          <CommentSection />
        </div>
        <Sidebar />
      </section>
    </section>
  );
};

export default Detail;
