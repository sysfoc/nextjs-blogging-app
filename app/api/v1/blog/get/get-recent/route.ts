import Post from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    const posts = await Post.find({})
      .sort({ created_at: -1 })
      .limit(4)
      .select("id name slug title image created_at sub_category_id")
      .lean();

    if (!posts || posts.length === 0) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    // Fetch subcategories
    const subCategoryIds = [...new Set(posts.map((p) => p.sub_category_id))];
    const subCategories = await SubCategory.find({ id: { $in: subCategoryIds } })
      .select("id name slug main_category_id")
      .lean();

    const subCategoryMap = Object.fromEntries(
      subCategories.map((sc) => [sc.id, sc])
    );

    // Fetch main categories - using ObjectId correctly
    const mainCategoryIds = [...new Set(subCategories.map((sc) => sc.main_category_id))];
    const mainCategories = await MainCategory.find({ _id: { $in: mainCategoryIds } })
      .select("_id name slug")
      .lean();

    const mainCategoryMap = Object.fromEntries(
      mainCategories.map((mc) => [(mc._id as any).toString(), mc])
    );

    const finalPosts = posts.map((post) => {
      const subCategory = subCategoryMap[post.sub_category_id];
      const mainCategory = subCategory 
        ? mainCategoryMap[(subCategory.main_category_id as any).toString()] // Fixed: proper toString conversion
        : null;

      return {
        ...post,
        subCategory,
        category: mainCategory,
      };
    });

    return NextResponse.json({ posts: finalPosts }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching recent posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}