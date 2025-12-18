// app/api/v1/sub-category/delete/[id]/route.ts
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Check if subcategory exists
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return NextResponse.json(
        { message: "Subcategory not found" },
        { status: 404 }
      );
    }
    
    await SubCategory.findByIdAndDelete(id);
    
    return NextResponse.json(
      { message: "Subcategory deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete subcategory error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}