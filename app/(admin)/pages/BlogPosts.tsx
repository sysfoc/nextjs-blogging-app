// app/(admin)/pages/BlogPosts.tsx
"use client";
import React, { useState } from "react";
import Table from "@/app/(admin)/components/blog-posts/Table";
import Link from "next/link";

const BlogPosts = () => {
  const [buildLoading, setBuildLoading] = useState(false);

  const handleBuild = async () => {
    if (!confirm("Are you sure you want to rebuild the site?")) return;
    
    setBuildLoading(true);
    try {
      const res = await fetch("/api/v1/build/trigger", {
        method: "POST",
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("✅ " + data.message);
      } else {
        alert("❌ " + data.message);
      }
    } catch (error: any) {
      alert("❌ Build failed: " + error.message);
    } finally {
      setBuildLoading(false);
    }
  };

  return (
    <section className='my-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
        <div>
          <h1 className='font-bold text-2xl text-gray-800'>Blog Lists</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleBuild}
            type="button"
            disabled={buildLoading}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {buildLoading ? "Building..." : "Rebuild Site"}
          </button>
          <Link
            href={"/admin/blog-posts/create"}
            className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
          >
            Create Blog Posts
          </Link>
        </div>
      </div>
      <Table />
    </section>
  );
};

export default BlogPosts;