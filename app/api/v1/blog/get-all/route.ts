import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
