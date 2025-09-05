import Detail from "@/app/(public)/pages/Detail";
import { Metadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlogData(slug: string, type: string) {
  if (type === "server") {
    const cookieStore = await cookies();
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog/get-by-slug/${slug}`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    ).then((res) => (res.ok ? res.json() : null));
  } else {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog/get-by-slug/${slug}`,
      {
        cache: "no-store",
      }
    ).then((res) => (res.ok ? res.json() : null));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug, "server");

  return {
    title: data?.blog?.metaTitle || "Slug does not exist",
    description: data?.blog?.metaDescription || "Slug does not exist",
  };
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogData(slug, "client");

  return (
    <main>{data ? <Detail blog={data.blog} /> : <p>Blog not found</p>}</main>
  );
}
