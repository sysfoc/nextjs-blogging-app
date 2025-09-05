import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  connectToDatabase();
  try {
    const blog = await Blog.find({ postViews: { $gt: 0 } })
      .sort({ postViews: -1 })
      .limit(4)
      .populate({ path: "category", select: "name slug" })
      .populate({ path: "subCategory", select: "name slug" })
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
