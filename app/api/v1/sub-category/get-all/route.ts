// app/api/v1/sub-category/get-all/route.ts
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    const subCategories = await SubCategory.find({})
      .populate("main_category_id", "name slug")
      .select("name slug id main_category_id canonical metatitle metadesc h1 image createdAt updatedAt")
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { subCategories, count: subCategories.length },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}