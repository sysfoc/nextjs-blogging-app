// app/api/v1/category/get-by-category/[slug]/route.ts
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    const category = await MainCategory.findOne({ slug });
    
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    console.error("Get category by slug error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
}