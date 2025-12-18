// app/category/[category]/[subcategory]/page.tsx
import { cache } from 'react';
import SubCategory from "@/app/(public)/pages/SubCategory";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    subcategory: string;
  }>;
};

const getSubCategoryData = cache(async (subcategory: string) => {
  return fetch(
   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sub-category/get-by-name/${subcategory}`,
    {
      next: { revalidate: 0 }
    }
  ).then((res) => (res.ok ? res.json() : null));
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const data = await getSubCategoryData(subcategory);
  return {
    title: data?.subCategory?.metatitle || "SubCategory does not exist",
    description: data?.subCategory?.metadesc || "SubCategory does not exist",
  };
}
export default async function SubCategoryPage({ params }: Props) {
  const { subcategory } = await params;
  const data = await getSubCategoryData(subcategory);
  return (
    <main>
      <SubCategory subCategoryInfo={data?.subCategory} />
    </main>
  );
}