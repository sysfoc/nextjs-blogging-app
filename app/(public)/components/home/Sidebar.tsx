"use client";
import React, { useEffect, useState } from "react";
import Popular from "@/app/(public)/components/sidebar/Popular";
import Recent from "@/app/(public)/components/sidebar/Recent";
import Topics from "@/app/(public)/components/sidebar/Topics";
import Newsletter from "@/app/(public)/components/sidebar/Newsletter";
import Tags from "@/app/(public)/components/sidebar/Tags";

const URL = [
  "/api/v1/blog/get/popular-posts",
  "/api/v1/blog/get/editor-pick",
  "/api/v1/blog/get/topics",
];
const Sidebar = () => {
  const [editorsBlogs, setEditorsBlogs] = useState<any[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const responses = await Promise.all(
          URL.map((url) =>
            fetch(url, { method: "GET", credentials: "include" })
          )
        );
        const [popularRes, editorsPickRes, topicRes] = await Promise.all(
          responses.map((res) => res.json())
        );
        setPopularBlogs(popularRes.blog);
        setEditorsBlogs(editorsPickRes.blog);
        setTopics(topicRes.topics);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  return (
    <aside className='hidden md:flex md:w-[32%] flex-col gap-y-5'>
      <Popular data={popularBlogs} loading={loading} />
      <Recent data={editorsBlogs} loading={loading} />
      <Topics data={topics} loading={loading} />
      <Newsletter />
      <Tags data={topics} loading={loading} />
    </aside>
  );
};

export default Sidebar;
