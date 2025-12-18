// app/api/v1/blog/get/latest-posts/route.ts
import Post from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    // Fetch 6 most recent posts
    const posts = await Post.find({})
      .sort({ created_at: -1 })
      .limit(6)
      .select("id name slug title content image created_at sub_category_id uploaded_by user_id")
      .lean();

    if (!posts || posts.length === 0) {
      return NextResponse.json({ blog: [] }, { status: 200 });
    }

    // Fetch users - check if User has custom 'id' field or use _id
    const userIds = [...new Set(posts.map((p) => p.user_id))];
    
    // Try fetching by custom id field first (if User model has it)
    let users = await User.find({ id: { $in: userIds } })
      .select("id name")
      .lean();
    
    // If no results and userIds look like ObjectIds, try _id
    if (users.length === 0 && userIds[0]?.length === 24) {
      users = await User.find({ _id: { $in: userIds } })
        .select("_id name")
        .lean();
    }

    const userMap = Object.fromEntries(
      users.map((u: any) => [u.id || u._id.toString(), u.name])
    );

    // Fetch subcategories by custom string id
    const subCategoryIds = [...new Set(posts.map((p) => p.sub_category_id))];
    const subCategories = await SubCategory.find({ id: { $in: subCategoryIds } })
      .select("id name slug main_category_id")
      .lean();

    const subCategoryMap = Object.fromEntries(
      subCategories.map((sc) => [sc.id, sc])
    );

    // Fetch main categories by MongoDB _id
    const mainCategoryIds = [...new Set(subCategories.map((sc) => sc.main_category_id))];
    const mainCategories = await MainCategory.find({ _id: { $in: mainCategoryIds } })
      .select("_id name slug")
      .lean();

    const mainCategoryMap = Object.fromEntries(
      mainCategories.map((mc) => [(mc._id as any).toString(), mc])
    );

    // Build final response
    const blog = posts.map((post) => {
      const subCategory = subCategoryMap[post.sub_category_id];
      const mainCategory = subCategory 
        ? mainCategoryMap[(subCategory.main_category_id as any).toString()] 
        : null;

      return {
        _id: post._id,
        id: post.id,
        name: post.name,
        title: post.title,
        content: post.content,
        slug: post.slug,
        image: post.image,
        created_at: post.created_at,
        uploaded_by: post.uploaded_by || "Unknown",
        subCategory: subCategory ? {
          name: subCategory.name,
          slug: subCategory.slug
        } : null,
        category: mainCategory ? {
          name: mainCategory.name,
          slug: mainCategory.slug
        } : null
      };
    });

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching latest posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}