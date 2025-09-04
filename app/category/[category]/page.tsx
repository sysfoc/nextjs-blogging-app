import Category from "@/app/(public)/pages/Category";
type Props = {
  params: { category: string };
};
export async function generateMetadata({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/get-by-category/${params.category}`,
    { cache: "no-store" }
  );
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
