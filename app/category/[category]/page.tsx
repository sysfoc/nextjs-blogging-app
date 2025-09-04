import Category from "@/app/(public)/pages/Category";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    category: string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/get-by-category/${category}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return {
      title: "Category does not exist",
      description: "Category does not exist",
    };
  }
  const data = await res.json();
  return {
    title: data?.category?.metaTitle || "Category does not exist",
    description: data?.category?.metaDescription || "Category does not exist",
  };
}
export default function CategoryPage() {
  return (
    <main>
      <Category />
    </main>
  );
}
