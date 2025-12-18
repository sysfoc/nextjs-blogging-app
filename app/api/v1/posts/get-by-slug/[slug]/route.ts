// app/api/v1/posts/get-by-slug/[slug]/route.ts
import Post, { IPost } from "@/app/model/Posts.model";
import SubCategory, { ISubCategory } from "@/app/model/SubCategory.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

// Type for the API response
interface PostResponse {
  _id: string;
  name: string;
  slug: string;
  title?: string;
  content?: string;
  image?: string;
  user_id: { name: string; email: string } | null;
  sub_category: { name: string; slug: string } | null;
  [key: string]: any;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();

  try {
    const { slug } = await context.params;

    // 1️⃣ Fetch post
    const postDoc = await Post.findOne({ slug });
    if (!postDoc) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Convert Mongoose Document to plain object
    const post = postDoc.toObject();

    // 2️⃣ Fetch user manually - FIXED: Query by user_id field
    const userDoc = await User.findOne({ user_id: post.user_id }).select("name email");
    const user_id = userDoc
      ? { name: userDoc.name, email: userDoc.email }
      : null;

    // 3️⃣ Fetch subcategory manually
    const subCategoryDoc = await SubCategory.findOne({ id: post.sub_category_id }).select("name slug");
    const sub_category = subCategoryDoc
      ? { name: subCategoryDoc.name, slug: subCategoryDoc.slug }
      : null;

    // 4️⃣ Build final response
    const finalPost: PostResponse = {
      ...post,
      user_id,
      sub_category,
    };

    return NextResponse.json({ post: finalPost }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}