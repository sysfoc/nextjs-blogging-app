import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import "@/app/model/Category.model";
import "@/app/model/SubCategory.model";

export async function GET() {
  connectToDatabase();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate({
      path: "category",
      select: "name",
    }).populate({ path: "subCategory", select: "name" }).select("_id title image category subCategory");
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
