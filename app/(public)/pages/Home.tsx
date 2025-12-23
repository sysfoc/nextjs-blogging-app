// app/(public)/pages/Home.tsx
import HeroSection from "@/app/(public)/components/home/HeroSection";
import EditorsPick from "@/app/(public)/components/home/EditorsPick";
import NewsBlogs from "@/app/(public)/components/home/NewsBlogs";
import GeneralBlogs from "@/app/(public)/components/home/GeneralBlogs";
import LatestPosts from "@/app/(public)/components/home/LatestPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";

const URLs = [
  "/api/v1/blog/get/latest-posts",
  "/api/v1/blog/get/category-blogs",
  "/api/v1/blog/get-news-blogs",
  "/api/v1/blog/get-general-blogs",
];

async function fetchAllData() {
  try {
    const responses = await Promise.all(
      URLs.map((url) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        })
      )
    );
    const [heroRes, categoryRes, newsRes, generalRes] = await Promise.all(
      responses.map((res) => res.json())
    );
    return {
      heroData: heroRes.blog,
      categoryData: categoryRes.categories,
      newsData: newsRes.blogs,
      generalData: generalRes.blogs,
    };
  } catch (error) {
    console.error("API error:", error);
    return {
      heroData: null,
      categoryData: null,
      newsData: null,
      generalData: null,
    };
  }
}

export default async function BlogPage() {
  const { heroData, categoryData, newsData, generalData } = await fetchAllData();

  return (
    <section>
      <div className='flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <HeroSection data={heroData} loading={false} />
          <EditorsPick data={heroData} loading={false} />
          <NewsBlogs data={newsData} loading={false} />
          <GeneralBlogs data={generalData} loading={false} />
        </div>
        <Sidebar />
      </div>
      <LatestPosts data={categoryData} />
    </section>
  );
}