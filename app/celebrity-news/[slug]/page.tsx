import { cache } from "react";
import Detail from "@/app/(public)/pages/NewsDetail";
import { Metadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const getBlogData = cache(async (slug: string) => {
  const cookieStore = await cookies();
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/news/get-by-slug/${slug}`,
    {
      next: { revalidate: 3600 },
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  ).then((res) => (res.ok ? res.json() : null));
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);
  return {
    title: data?.news?.metaTitle || "Slug does not exist",
    description: data?.news?.metaDescription || "Slug does not exist",
  };
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogData(slug);
  return (
    <main>{data ? <Detail news={data.news} /> : <p>News not found</p>}</main>
  );
}
