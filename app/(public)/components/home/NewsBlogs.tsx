// app/(public)/components/home/NewsBlogs.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: any;
  loading: boolean;
}

const NewsBlogs = ({ data: newsBlogs, loading }: Props) => {
  return (
    <section className="mt-12">
      <div className="my-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Latest News</h2>
            <div className="mt-2">
              <svg width="33" height="6" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient
                    id="gradient-news"
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
                  stroke="url(#gradient-news)"
                  strokeWidth="2"
                  fill="none"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-[120px] sm:w-[150px] md:w-[180px] h-[100px] sm:h-[120px] md:h-[140px] bg-gray-300 rounded-lg shrink-0" />
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <div className="h-4 sm:h-5 bg-gray-300 rounded w-full mb-2" />
                      <div className="h-4 sm:h-5 bg-gray-300 rounded w-3/4" />
                    </div>
                    <div className="mt-2">
                      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      <div className="h-3 bg-gray-200 rounded w-20" />
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          newsBlogs?.slice(0, 6)?.map((news: any, index: number) => (
            <div
              key={index}
              className="p-3 rounded-lg transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="w-[120px] sm:w-[150px] md:w-[180px] h-[100px] sm:h-[120px] md:h-[140px] relative shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={`/posts/images/${news?.image}`}
                    alt={`${news?.title}-img`}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 639px) 120px, (max-width: 767px) 150px, 180px"
                    quality={75}
                    priority={index < 2}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white text-xs font-semibold rounded-full">
                      NEWS
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <Link href={`/blog/${news?.slug}`}>
                      <h2 className="font-bold text-sm sm:text-base md:text-lg leading-tight transition-colors line-clamp-2">
                        {news?.title}
                      </h2>
                    </Link>
                    <p
                      className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: news?.description || "",
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-600 mt-2 flex-wrap">
                    <span className="font-medium truncate">{news?.author}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                    <span className="whitespace-nowrap text-gray-600">
                      {news?.created_at
                        ? new Date(
                            news?.created_at.replace(" ", "T")
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
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default NewsBlogs;