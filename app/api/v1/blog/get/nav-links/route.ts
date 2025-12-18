// app/api/v1/blog/get/nav-links/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import Category from "@/app/model/MainCategory.model";
import SubCategory from "@/app/model/SubCategory.model";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}, "name slug").lean();

    const result = await Promise.all(
      categories.map(async (cat) => {
        const subcategories = await SubCategory.find(
          { main_category_id: cat._id },
          "name slug"
        ).lean();

        return {
          categoryName: cat.name,
          categorySlug: cat.slug,
          subcategories: subcategories.map((sub) => ({
            name: sub.name,
            slug: sub.slug,
          })),
        };
      })
    );

    return NextResponse.json({ success: true, categories: result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch category names and slugs" },
      { status: 500 }
    );
  }
}
