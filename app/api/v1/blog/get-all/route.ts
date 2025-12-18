// app/api/v1/blog/get-all/route.ts
import Blog from "@/app/model/Blog.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const blogs = await Blog.find({})
      .sort({ created_at: -1 })
      .select("_id id title slug image type status author views")
      .lean();

    // Manually fetch users
    const userIds = [...new Set(blogs.map((b) => b.user_id).filter(Boolean))];
    const users = (await User.find({ _id: { $in: userIds } })
      .select("name email")
      .lean()) as any[];

    const userMap = Object.fromEntries(
      users.map((u) => [u._id.toString(), { name: u.name, email: u.email }])
    );

    const finalBlogs = blogs.map((blog) => ({
      ...blog,
      user_id: blog.user_id ? userMap[blog.user_id] || null : null,
    }));

    return NextResponse.json({ blogs: finalBlogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
