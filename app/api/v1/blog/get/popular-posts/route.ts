// app/api/v1/blog/get/popular-posts/route.ts
import Post from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDatabase();
  
  try {
    const posts = await Post.find({ views: { $gt: "0" } })
      .sort({ views: -1 })
      .limit(4)
      .select("name slug title image created_at sub_category_id")
      .lean();

    // Manually fetch subcategories
    const subCategoryIds = [...new Set(posts.map(p => p.sub_category_id))];
    const subCategories = await SubCategory.find({ id: { $in: subCategoryIds } })
      .select("id name slug main_category_id")
      .lean();

    const subCategoryMap = Object.fromEntries(
      subCategories.map(sc => [sc.id, sc])
    );

    // Fetch main categories by MongoDB _id
    const mainCategoryIds = [...new Set(subCategories.map((sc) => sc.main_category_id))];
    const mainCategories = await MainCategory.find({ _id: { $in: mainCategoryIds } })
      .select("_id name slug")
      .lean();

    const mainCategoryMap = Object.fromEntries(
      mainCategories.map((mc) => [(mc._id as any).toString(), mc])
    );

    const finalPosts = posts.map(post => {
      const subCategory = subCategoryMap[post.sub_category_id];
      const mainCategory = subCategory 
        ? mainCategoryMap[(subCategory.main_category_id as any).toString()] 
        : null;

      return {
        ...post,
        subCategory: subCategory ? {
          id: subCategory.id,
          name: subCategory.name,
          slug: subCategory.slug
        } : null,
        category: mainCategory ? {
          name: mainCategory.name,
          slug: mainCategory.slug
        } : null
      };
    });

    return NextResponse.json({ posts: finalPosts }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}