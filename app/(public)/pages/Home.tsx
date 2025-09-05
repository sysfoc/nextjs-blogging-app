"use client";
import HeroSection from "@/app/(public)/components/home/HeroSection";
import EditorsPick from "@/app/(public)/components/home/EditorsPick";
// import Trending from "@/app/(public)/components/home/Trending";
// import LatestPosts from "@/app/(public)/components/home/LatestPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import { useEffect, useState } from "react";

const URLs = ["/api/v1/blog/get/latest-posts"];

export default function BlogPage() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const responses = await Promise.all(
          URLs.map((url) =>
            fetch(url, { method: "GET", credentials: "include" })
          )
        );
        const [heroRes] = await Promise.all(
          responses.map((res) => res.json())
        );
        setHeroData(heroRes.blog);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  return (
    <section className='flex justify-between gap-x-6 gap-y-5'>
      <div className='w-full md:w-[68%]'>
        <HeroSection data={heroData} loading={loading} />
        <EditorsPick data={heroData} loading={loading} />
        {/* <Trending data={editorsPickData} loading={loading}/> */}
        {/* <LatestPosts /> */}
      </div>
      <Sidebar />
    </section>
  );
}
