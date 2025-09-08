"use client";
import React, { useEffect } from "react";

const Ui = () => {
  const [data, setData] = React.useState({
    users: 0,
    blogs: 0,
    news: 0,
    posts: 0,
    categories: 0,
    subCategories: 0,
    comments: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const dashboardStatistics = [
    {
      title: "Users",
      counts: data.users,
    },
    {
      title: "Blogs",
      counts: data.blogs,
    },
    {
      title: "News",
      counts: data.news,
    },
    {
      title: "Posts",
      counts: data.posts,
    },
    {
      title: "Categories",
      counts: data.categories,
    },
    {
      title: "SubCategories",
      counts: data.subCategories,
    },
    {
      title: "Comments",
      counts: data.comments,
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/dashboard/statistics", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setData(data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className='my-8'>
      <div>
        <h1 className='font-bold text-2xl text-gray-800'>Dashboard</h1>
      </div>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {dashboardStatistics.map((item, index) => (
          <div
            key={index}
            className='px-4 py-8 md:px-8 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] shadow rounded'
          >
            <div className='text-center'>
              <h2 className='font-bold text-xl text-white'>{item.title}</h2>
              <p className='mt-2 text-white'>
                (
                {loading ? (
                  <span className='animate-pulse'>...</span>
                ) : (
                  item.counts
                )}
                )
              </p>
            </div>
            <div className='bg-black/5 w-full mt-2 p-2'>
              <p className='text-white text-center text-xs'>
                Active {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ui;
