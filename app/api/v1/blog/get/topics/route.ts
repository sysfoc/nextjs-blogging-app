// /app/api/v1/blog/get/topics/route.ts
import Post from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    // Get all posts
    const posts = await Post.find({}).select("sub_category_id").lean();

    // Count posts per subcategory
    const countMap: { [key: string]: number } = {};
    posts.forEach((post) => {
      countMap[post.sub_category_id] = (countMap[post.sub_category_id] || 0) + 1;
    });

    // Get subcategories
    const subCategoryIds = Object.keys(countMap);
    const subCategories = await SubCategory.find({ id: { $in: subCategoryIds } })
      .select("id name slug main_category_id")
      .lean();

    // Get main categories
    const mainCategoryIds = [...new Set(subCategories.map((sc) => sc.main_category_id))];
    const mainCategories = await MainCategory.find({ _id: { $in: mainCategoryIds } })
      .select("_id name slug")
      .lean();

    const mainCategoryMap = Object.fromEntries(
      mainCategories.map((mc) => [(mc._id as any).toString(), mc])
    );

    // Build final topics array
    const topics = subCategories.map((subCategory) => {
      const mainCategory = mainCategoryMap[(subCategory.main_category_id as any).toString()];
      return {
        subCategoryName: subCategory.name,
        subCategorySlug: subCategory.slug,
        parentCategory: mainCategory?.name || "",
        parentCategorySlug: mainCategory?.slug || "",
        count: countMap[subCategory.id] || 0,
      };
    });

    return NextResponse.json({ topics }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}