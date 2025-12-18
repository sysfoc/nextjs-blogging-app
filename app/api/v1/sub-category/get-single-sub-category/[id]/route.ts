// app/api/v1/sub-category/get-single-sub-category/[id]/route.ts
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const subCategory = await SubCategory.findById(id)
      .populate("main_category_id", "name slug");
    
    if (!subCategory) {
      return NextResponse.json(
        { message: "Subcategory not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ subCategory }, { status: 200 });
  } catch (error: any) {
    console.error("Get subcategory by ID error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch subcategory" },
      { status: 500 }
    );
  }
}