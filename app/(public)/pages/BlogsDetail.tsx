"use client";
import HeroSection from "@/app/(public)/components/blogs/detail/HeroSection";
import DetailContent from "@/app/(public)/components/blogs/detail/DetailContent";

interface Props {
  blogs: any;
}
const NewsDetail = ({ blogs }: Props) => {
  return (
    <section>
      <HeroSection blogs={blogs} />
      <section className='mx-4 md:mx-12 my-8'>
        <DetailContent blogsDetail={blogs?.description} />
      </section>
    </section>
  );
};

export default NewsDetail;
