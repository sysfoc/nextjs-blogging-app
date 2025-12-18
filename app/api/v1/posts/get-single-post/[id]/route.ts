// app/api/v1/posts/get-single-post/[id]/route.ts
import Post, { IPost } from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

// Type-safe interface for response
interface PostResponse extends Omit<IPost, "user_id" | "sub_category_id"> {
  user_id: { name: string; email: string } | null;
  sub_category: { name: string; slug: string } | null;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  try {
    const { id } = await context.params;

    // 1️⃣ Fetch post
    const postDoc = await Post.findOne({ id }).select("-__v");
    if (!postDoc) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

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

    // 4️⃣ Construct final response
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