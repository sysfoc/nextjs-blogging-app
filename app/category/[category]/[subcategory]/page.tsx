import SubCategory from "@/app/(public)/pages/SubCategory";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    subcategory: string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sub-category/get-by-name/${subcategory}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return {
      title: "SubCategory does not exist",
      description: "SubCategory does not exist",
    };
  }
  const data = await res.json();
  return {
    title: data?.subCategory?.metaTitle || "SubCategory does not exist",
    description:
      data?.subCategory?.metaDescription || "SubCategory does not exist",
  };
}
export default function SubCategoryPage() {
  return (
    <main>
      <SubCategory />
    </main>
  );
}
