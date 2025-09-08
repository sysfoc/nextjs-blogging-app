import { Metadata } from "next";
import React from "react";
import News from "@/app/(public)/pages/News";
import NewsPosts from "@/app/(public)/components/news/NewsPosts";

export const metadata: Metadata = {
  title: "Net Worth Mama News",
  description: "Get the scoop on wealth and success with Net Worth Mama News.",
};
export default function CelebrityNews() {
  return (
    <main>
      <News />
      <section className='mx-4 md:mx-12 my-8 '>
        <NewsPosts />
      </section>
    </main>
  );
}
