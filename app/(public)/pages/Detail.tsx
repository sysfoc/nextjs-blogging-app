import React from "react";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import HeroSection from "@/app/(public)/components/detail/HeroSection";
import DetailContent from "@/app/(public)/components/detail/DetailContent";
import CommentSection from "@/app/(public)/components/detail/CommentSection";
const Detail = () => {
  return (
    <section>
      <HeroSection />
      <section className='mx-4 md:mx-12 my-8 flex justify-between gap-x-6 gap-y-5'>
        <div className='w-full md:w-[68%]'>
          <DetailContent />
          <CommentSection />
        </div>
        <Sidebar />
      </section>
    </section>
  );
};

export default Detail;
