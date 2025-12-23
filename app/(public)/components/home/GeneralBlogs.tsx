// app/(public)/components/home/GeneralBlogs.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: any;
  loading: boolean;
}

const GeneralBlogs = ({ data: generalBlogs, loading }: Props) => {
  return (
    <section className="mt-12">
      <div className="my-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Featured Blogs</h3>
            <div className="mt-2">
              <svg width="33" height="6" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient
                    id="gradient-general"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FE4F70"></stop>
                    <stop offset="100%" stopColor="#FFA387"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5"
                  stroke="url(#gradient-general)"
                  strokeWidth="2"
                  fill="none"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200/70 rounded-xl overflow-hidden">
        <div className="p-3 sm:p-5">
          <div className="space-y-4 sm:space-y-5">
            {loading ? (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`animate-pulse ${
                      i !== 0 ? "pt-4 sm:pt-5 border-t border-gray-200/70" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                      <div className="w-full sm:w-[200px] h-[180px] sm:h-[150px] bg-gray-300 rounded-lg shrink-0" />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-2 sm:space-y-3">
                          <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4" />
                          <div className="h-5 sm:h-6 bg-gray-300 rounded w-full" />
                          <div className="h-4 bg-gray-200 rounded w-full mt-2" />
                          <div className="h-4 bg-gray-200 rounded w-5/6" />
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="h-3 bg-gray-200 rounded w-24" />
                          <div className="w-1 h-1 rounded-full bg-gray-300" />
                          <div className="h-3 bg-gray-200 rounded w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              generalBlogs?.slice(0, 5)?.map((blog: any, index: number) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "pt-4 sm:pt-5 border-t border-gray-200/70" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-3 -m-3 rounded-lg transition-all duration-300">
                    <div className="w-full sm:w-[200px] h-[200px] sm:h-[150px] relative shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={`/posts/images/${blog?.image}`}
                        alt={`${blog?.title}-img`}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white text-xs font-semibold rounded-full">
                          Blog
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <Link href={`/blog/${blog?.slug}`}>
                          <h2 className="font-bold text-lg sm:text-xl leading-tight transition-colors line-clamp-2">
                            {blog?.title}
                          </h2>
                        </Link>
                        <p
                          className="text-sm text-gray-500 mt-2 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: blog?.description || "",
                          }}
                        />
                      </div>

                      <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 mt-3">
                        <span className="font-medium text-gray-700">
                          {blog?.author}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="text-gray-600">
                          {blog?.created_at
                            ? new Date(
                                blog?.created_at.replace(" ", "T")
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : new Date().toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                        </span>
                        {blog?.views && (
                          <>
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-xs">{blog.views} views</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralBlogs;