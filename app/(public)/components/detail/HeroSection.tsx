import Link from "next/link";
import React from "react";

interface Props {
  blog: any;
}
const HeroSection = ({ blog }: Props) => {
  return (
    <div
      className="relative w-full min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(/posts/images/${blog?.image})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 w-full md:w-[70%] flex flex-col gap-y-5 justify-end p-5 md:p-16 text-white">
        <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize">
          {blog?.category?.name}
        </button>
        <div className="flex items-center flex-wrap gap-x-2">
          <Link href="/">
            <span className="text-sm whitespace-nowrap">Home / </span>
          </Link>
          <Link href={`/category/${blog?.category?.name}`}>
            <span className="text-sm whitespace-nowrap">
              {blog?.category?.name} /{" "}
            </span>
          </Link>
          <Link
            href={`/category/${blog?.category?.name}/${blog?.subCategory?.name}`}
          >
            <span className="text-sm whitespace-nowrap">
              {blog?.subCategory?.name} /{" "}
            </span>
          </Link>
          <span className="text-sm ">{blog?.slug}</span>
        </div>
        <h1 className="font-bold text-4xl">{blog?.title}</h1>
        <div className="flex items-center gap-x-5">
          <p className="text-sm">{blog?.uploaded_by}</p>
          <div className="w-1 h-1 rounded-full bg-white" />
          <p className="text-sm">
            {new Date(blog?.created_at.replace(" ", "T")).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
          <div className="w-1 h-1 rounded-full bg-white" />
          <p className="text-sm">
            {blog?.views} {blog?.views > 1 ? "views" : "view"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
