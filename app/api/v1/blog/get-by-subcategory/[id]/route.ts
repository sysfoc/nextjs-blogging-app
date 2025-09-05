import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import "@/app/model/Category.model";
import "@/app/model/SubCategory.model";

export async function GET(req: Request, context: any) {
  connectToDatabase();
  try {
    const { id } = context.params;
    const blogs = await Blog.find({ subCategory: id })
      .populate({ path: "category", select: "name slug" })
      .populate({ path: "subCategory", select: "name slug" })
      .select("-__v -userId -metaTitle -metaDescription")
      .sort({ createdAt: -1 });

    if (!blogs) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
