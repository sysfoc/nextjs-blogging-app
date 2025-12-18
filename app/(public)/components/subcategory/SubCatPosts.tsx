// app/(public)/components/subcategory/SubCatPosts.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pagination from "@/app/(admin)/components/common/Pagination";

interface Props {
  blogs: any[];
  categorySlug?: string;
  subCategorySlug?: string;
}

const ITEMS_PER_PAGE = 15;

const SubCatPosts = ({ blogs: data, categorySlug, subCategorySlug }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <div className="border border-gray-200/70 rounded-xl overflow-x-hidden">
        <div className="p-4">
          <div className="flex flex-col">
            {paginatedData?.map((post, index) => (
              <div
                key={post?._id}
                className={`flex items-center flex-wrap md:flex-nowrap gap-x-5 pb-4 ${
                  index !== 0 ? "pt-4 border-t border-gray-200/70" : ""
                }`}
              >
                <div className="w-full md:w-[300px] h-[300px] md:h-[200px] rounded-md overflow-hidden relative shrink-0">
                  <Image
                    src={`/posts/images/${post?.image}`}
                    alt="blog-image"
                    fill
                    className="object-cover"
                    fetchPriority="high"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <button className="w-fit text-xs py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full capitalize">
                      {post?.nationality}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="my-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src="/blog-img.jpg"
                          alt="profile"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-sm font-semibold">{post?.uploaded_by}</p>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#FE4F70]" />
                    <p className="text-sm">
                      {new Date(
                        post?.created_at.replace(" ", "T")
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Link
                    href={`/category/${categorySlug || post?.category?.slug}/${
                      subCategorySlug || post?.subCategory?.slug
                    }/${post?.slug}`}
                  >
                    <h3 className="font-bold text-xl">{post?.title}</h3>
                  </Link>
                  <p
                    className="text-gray-400 my-1 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={data.length}
        />
      )}
    </div>
  );
};

export default SubCatPosts;