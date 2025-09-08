import { Metadata } from "next";
import React from "react";
import Blog from "@/app/(public)/pages/Blogs";
import BlogPosts from "@/app/(public)/components/blogs/BlogPosts";

export const metadata: Metadata = {
  title: "Net Worth Mama Blogs | Insider Insights on Wealth Success",
  description:
    "Get the scoop on wealth and success with Net Worth Mama blogs. Learn in detail about the assets and bank balances of those you admire.",
};
export default function Blogs() {
  return (
    <main>
      <Blog />
      <section className='mx-4 md:mx-12 my-8 '>
        <BlogPosts />
      </section>
    </main>
  );
}
