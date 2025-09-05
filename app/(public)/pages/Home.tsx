"use client";
import HeroSection from "@/app/(public)/components/home/HeroSection";
import EditorsPick from "@/app/(public)/components/home/EditorsPick";
// import Trending from "@/app/(public)/components/home/Trending";
import LatestPosts from "@/app/(public)/components/home/LatestPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import { useEffect, useState } from "react";

const URLs = [
  "/api/v1/blog/get/latest-posts",
  "/api/v1/blog/get/category-blogs",
];

export default function BlogPage() {
  const [heroData, setHeroData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const responses = await Promise.all(
          URLs.map((url) =>
            fetch(url, { method: "GET", credentials: "include" })
          )
        );
        const [heroRes, categoryRes] = await Promise.all(
          responses.map((res) => res.json())
        );
        setHeroData(heroRes.blog);
        setCategoryData(categoryRes.categories);
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
          {/* <Trending data={heroData} loading={loading}/> */}
        </div>
        <Sidebar />
      </div>
      <LatestPosts data={categoryData} />
    </section>
  );
}
