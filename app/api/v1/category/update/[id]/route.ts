// app/api/v1/category/update/[id]/route.ts
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { name, metaTitle, metaDescription, h1Title } = await request.json();
    
    if (!name || !metaTitle || !metaDescription || !h1Title) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    
    // Check if category exists
    const category = await MainCategory.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    // Check if another category with same name or slug exists (excluding current category)
    const existingCategory = await MainCategory.findOne({
      _id: { $ne: id },
      $or: [{ name }, { slug }]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { message: "Category with this name or slug already exists" },
        { status: 400 }
      );
    }
    
    // Update the category
    const updatedCategory = await MainCategory.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        metaTitle,
        metaDescription,
        h1Title
      },
      { new: true }
    );
    
    return NextResponse.json(
      { category: updatedCategory, message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}