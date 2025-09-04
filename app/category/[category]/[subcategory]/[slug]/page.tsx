import Detail from "@/app/(public)/pages/Detail";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog/get-by-slug/${slug}`,
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
    title: data?.blog?.metaTitle || "SubCategory does not exist",
    description: data?.blog?.metaDescription || "SubCategory does not exist",
  };
}
export default function DetailPage() {
  return (
    <main>
      <Detail />
    </main>
  );
}
