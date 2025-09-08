"use client";
import HeroSection from "@/app/(public)/components/news/detail/HeroSection";
import DetailContent from "@/app/(public)/components/news/detail/DetailContent";

interface Props {
  news: any;
}
const NewsDetail = ({ news }: Props) => {
  return (
    <section>
      <HeroSection news={news} />
      <section className='mx-4 md:mx-12 my-8'>
        <DetailContent newsDetail={news?.content} />
      </section>
    </section>
  );
};

export default NewsDetail;
