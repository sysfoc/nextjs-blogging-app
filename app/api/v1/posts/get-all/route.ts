// app/api/v1/posts/get-all/route.ts
import Post from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    // fetch posts
    const posts = await Post.find({}).sort({ created_at: -1 }).lean();

    // manually fetch users - FIXED: Query by user_id (string) not _id (ObjectId)
    const userIds = [...new Set(posts.map((p) => p.user_id))];
    const users = await User.find({ user_id: { $in: userIds } })
      .select("user_id name email")
      .lean();

    const userMap = Object.fromEntries(
      users.map((u) => [
        u.user_id,
        { name: u.name, email: u.email },
      ])
    );

    // manually attach sub category data (string-based)
    const subCategoryIds = [...new Set(posts.map((p) => p.sub_category_id))];
    const subCategories = await SubCategory.find({
      id: { $in: subCategoryIds },
    })
      .select("id name slug")
      .lean();

    const subCategoryMap = Object.fromEntries(
      subCategories.map((sc) => [sc.id, sc])
    );

    const finalPosts = posts.map((post) => ({
      ...post,
      user_id: userMap[post.user_id] || null,
      sub_category: subCategoryMap[post.sub_category_id] || null,
    }));

    return NextResponse.json({ posts: finalPosts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}