// app/api/v1/blog/by-slug/[slug]/route.ts
import Blog from "@/app/model/Blog.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  
  try {
    const { slug } = await context.params;

    const blogDoc = await Blog.findOne({ slug });
    if (!blogDoc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blog = blogDoc.toObject();

    // Fetch user manually if user_id exists
    let user_id = null;
    if (blog.user_id) {
      const userDoc = await User.findOne({ user_id: blog.user_id }).select("name email");
      user_id = userDoc ? { name: userDoc.name, email: userDoc.email } : null;
    }

    const finalBlog = {
      ...blog,
      user_id,
    };

    return NextResponse.json({ blog: finalBlog }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

