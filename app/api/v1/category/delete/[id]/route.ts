// app/api/v1/category/delete/[id]/route.ts
import MainCategory from "@/app/model/MainCategory.model";
import SubCategory from "@/app/model/SubCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Check if category exists
    const category = await MainCategory.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    
    // Delete all subcategories associated with this main category
    await SubCategory.deleteMany({ main_category_id: id });
    
    // Delete the main category
    await MainCategory.findByIdAndDelete(id);
    
    return NextResponse.json(
      { message: "Category and associated subcategories deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}