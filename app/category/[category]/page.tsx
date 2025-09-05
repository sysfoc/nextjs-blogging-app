import { cache } from "react";
import Category from "@/app/(public)/pages/Category";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const getCategoryData = cache(async (category: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/get-by-category/${category}`,
    {
      next: { revalidate: 3600 },
    }
  ).then((res) => (res.ok ? res.json() : null));
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const data = await getCategoryData(category);
  return {
    title: data?.category?.metaTitle || "Category does not exist",
    description: data?.category?.metaDescription || "Category does not exist",
  };
}
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const data = await getCategoryData(category);
  return (
    <main>
      <Category categoryInfo={data?.category} />
    </main>
  );
}
