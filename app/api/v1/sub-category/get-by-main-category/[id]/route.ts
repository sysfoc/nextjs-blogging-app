// app/api/v1/sub-category/get-by-main-category/[id]/route.ts
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
    
    const subCategories = await SubCategory.find({ main_category_id: id })
      .populate("main_category_id", "name slug")
      .select("name slug id main_category_id canonical metatitle metadesc h1 image createdAt updatedAt")
      .sort({ name: 1 });
    
    return NextResponse.json(
      { subCategories, count: subCategories.length },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get subcategories by main category error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}