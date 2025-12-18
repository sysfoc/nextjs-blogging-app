// app/(public)/pages/Home.tsx
"use client";
import HeroSection from "@/app/(public)/components/home/HeroSection";
import EditorsPick from "@/app/(public)/components/home/EditorsPick";
import NewsBlogs from "@/app/(public)/components/home/NewsBlogs";
import GeneralBlogs from "@/app/(public)/components/home/GeneralBlogs";
import LatestPosts from "@/app/(public)/components/home/LatestPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import { useEffect, useState } from "react";

const URLs = [
  "/api/v1/blog/get/latest-posts",
  "/api/v1/blog/get/category-blogs",
  "/api/v1/blog/get-news-blogs",
  "/api/v1/blog/get-general-blogs",
];

export default function BlogPage() {
  const [heroData, setHeroData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const responses = await Promise.all(
          URLs.map((url) =>
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
              method: "GET",
              credentials: "include",
            })
          )
        );
        const [heroRes, categoryRes, newsRes, generalRes] = await Promise.all(
          responses.map((res) => res.json())
        );
        setHeroData(heroRes.blog);
        setCategoryData(categoryRes.categories);
        setNewsData(newsRes.blogs);
        setGeneralData(generalRes.blogs);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <section>
      <div className='flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <HeroSection data={heroData} loading={loading} />
          <EditorsPick data={heroData} loading={loading} />
          <NewsBlogs data={newsData} loading={loading} />
          <GeneralBlogs data={generalData} loading={loading} />
        </div>
        <Sidebar />
      </div>
      <LatestPosts data={categoryData} />
    </section>
  );
}