"use client";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import HeroSection from "@/app/(public)/components/detail/HeroSection";
import DetailContent from "@/app/(public)/components/detail/DetailContent";
import CommentSection from "@/app/(public)/components/detail/CommentSection";

interface Props {
  blog: any;
}
const Detail = ({blog}: Props) => {
  return (
    <section>
      <HeroSection blog={blog} />
      <section className='mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <DetailContent blogDetail={blog?.content} />
          <CommentSection blogId={blog?._id} />
        </div>
        <Sidebar />
      </section>
    </section>
  );
};

export default Detail;
