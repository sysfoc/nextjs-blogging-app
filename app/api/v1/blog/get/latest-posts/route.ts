import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  connectToDatabase();
  try {
    const blog = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate({ path: "category", select: "name" })
      .populate({ path: "subCategory", select: "name" })
      .select("-__v -userId -metaTitle -metaDescription");

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
