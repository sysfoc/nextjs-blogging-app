// app/api/v1/category/get-all/route.ts
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    const categories = await MainCategory.find({})
      .sort({ createdAt: -1 })
      .select("_id name slug metaTitle metaDescription h1Title createdAt updatedAt");
    
    return NextResponse.json(
      { categories, count: categories.length },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}