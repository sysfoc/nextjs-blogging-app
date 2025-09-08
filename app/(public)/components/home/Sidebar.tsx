"use client";
import React, { useEffect, useState } from "react";
import Popular from "@/app/(public)/components/sidebar/Popular";
import Recent from "@/app/(public)/components/sidebar/Recent";
import Topics from "@/app/(public)/components/sidebar/Topics";
import Newsletter from "@/app/(public)/components/sidebar/Newsletter";
import Tags from "@/app/(public)/components/sidebar/Tags";

const URL = {
  popular: "/api/v1/blog/get/popular-posts",
  editors: "/api/v1/blog/get/editor-pick",
  topics: "/api/v1/blog/get/topics",
};

const CACHE_EXPIRY = 3 * 60 * 1000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

const Sidebar = () => {
  const [editorsBlogs, setEditorsBlogs] = useState<any[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWithRetry = async (
    url: string,
    retries = MAX_RETRIES
  ): Promise<any | null> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed: ${url}`);
      return await res.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, retries - 1);
      }
      return null;
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const cached = localStorage.getItem("sidebarCache");
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setPopularBlogs(data.popularBlogs || []);
            setEditorsBlogs(data.editorsBlogs || []);
            setTopics(data.topics || []);
            setLoading(false);
            return;
          }
        }
        const [popularRes, editorsPickRes, topicRes] = await Promise.all([
          fetchWithRetry(URL.popular),
          fetchWithRetry(URL.editors),
          fetchWithRetry(URL.topics),
        ]);

        let data: any = {};

        if (popularRes?.blog) {
          setPopularBlogs(popularRes.blog);
          data.popularBlogs = popularRes.blog;
        }
        if (editorsPickRes?.blog) {
          setEditorsBlogs(editorsPickRes.blog);
          data.editorsBlogs = editorsPickRes.blog;
        }
        if (topicRes?.topics) {
          setTopics(topicRes.topics);
          data.topics = topicRes.topics;
        }
        if (Object.keys(data).length > 0) {
          localStorage.setItem(
            "sidebarCache",
            JSON.stringify({ data, timestamp: Date.now() })
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <aside className='flex md:w-[32%] flex-col gap-y-5'>
      <Popular data={popularBlogs} loading={loading} />
      <Recent data={editorsBlogs} loading={loading} />
      <Topics data={topics} loading={loading} />
      <Newsletter />
      <Tags data={topics} loading={loading} />
    </aside>
  );
};

export default Sidebar;
