// app/(public)/components/home/EditorsPick.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: any;
  loading: boolean;
}
const EditorsPick = ({ data: blogs, loading }: Props) => {
  return (
    <section className="mt-12">
      <div className="my-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
        </div>
        <div className="mt-2">
          <svg width="33" height="6" xmlns="https://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FE4F70"></stop>
                <stop offset="100%" stopColor="#FFA387"></stop>
              </linearGradient>
            </defs>
            <path
              d="M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
            ></path>
          </svg>
        </div>
      </div>
      <div className="border border-gray-200/70 rounded-xl">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {loading ? (
              <div className="relative animate-pulse">
                <div className="absolute top-4 left-4">
                  <div className="h-6 w-20 bg-gray-300 rounded-full" />
                </div>
                <div className="h-60 w-full bg-gray-300 rounded-xl" />
                <div className="my-3 flex items-center gap-x-5">
                  <div className="flex items-center gap-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
                <div>
                  <div className="h-6 w-40 bg-gray-300 rounded mb-2" />
                  <div className="h-4 w-60 bg-gray-200 rounded" />
                </div>
              </div>
            ) : (
              blogs?.slice(1, 2)?.map((post: any, index: number) => (
                <div className="relative" key={index}>
                  <div className="absolute top-4 left-4">
                    <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm capitalize">
                      {post?.subCategory?.name}
                    </button>
                  </div>
                  <div>
                    <Image
                      src={`/posts/images/${post?.image}`}
                      alt="image"
                      width={300}
                      height={300}
                      className="size-full rounded-xl"
                    />
                  </div>
                  <div className="my-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src={`/posts/images/${post?.image}`}
                          alt="profile"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-sm font-semibold">
                        {post?.uploaded_by}
                      </p>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#FE4F70]" />
                    <p className="text-sm">
                      {new Date().toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/category/${post?.category?.slug}/${post?.subCategory?.slug}/${post?.slug}`}
                    >
                      <h2 className="font-bold text-xl">
                        {post?.title.slice(0, 48)}...
                      </h2>
                    </Link>
                    <div className="mt-2 text-gray-500 line-clamp-3 md:line-clamp-5">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post?.content,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="flex flex-col">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-x-5 pb-4 ${
                        i !== 0 ? "pt-4 border-t border-gray-200/70" : ""
                      } animate-pulse`}
                    >
                      <div className="w-[100px] h-[80px] rounded-md bg-gray-300" />
                      <div className="flex-1">
                        <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))
                : blogs?.slice(2, 6)?.map((post: any, index: number) => (
                    <div
                      key={post?._id}
                      className={`flex items-center gap-x-5 pb-4 ${
                        index !== 0 ? "pt-4 border-t border-gray-200/70" : ""
                      }`}
                    >
                      <div className="w-[100px] h-[80px] rounded-md overflow-hidden relative shrink-0">
                        <Image
                          src={`/posts/images/${post?.image}`}
                          alt="blog-image"
                          fill
                          className="object-cover"
                          fetchPriority="high"
                          priority
                        />
                      </div>
                      <div>
                        <Link
                          href={`/category/${post?.category?.name}/${post?.subCategory?.name}/${post?.slug}`}
                        >
                          <h2 className="font-bold">
                            {post?.title.slice(0, 48)}...
                          </h2>
                        </Link>
                        <p className="text-xs text-gray-800 md:text-gray-600 mt-1">
                          {new Date(
                            post?.created_at.replace(" ", "T")
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
