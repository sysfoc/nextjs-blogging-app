import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import "@/app/model/MainCategory.model";
import "@/app/model/SubCategory.model";

export async function GET(req: Request) {
  connectToDatabase();
  try {
    const blog = await Blog.find({isEditorPick: true})
      .sort({ created_at: -1 })
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
