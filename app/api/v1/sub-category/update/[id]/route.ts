// app/api/v1/sub-category/update/[id]/route.ts
import SubCategory from "@/app/model/SubCategory.model";
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
    const {
      name,
      main_category_id,
      canonical,
      metatitle,
      metadesc,
      h1,
      image
    } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }
    
    // Check if subcategory exists
    const existingSubCategory = await SubCategory.findById(id);
    if (!existingSubCategory) {
      return NextResponse.json(
        { message: "Subcategory not found" },
        { status: 404 }
      );
    }
    
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    // Check if main category exists if being updated
    if (main_category_id) {
      const mainCategory = await MainCategory.findById(main_category_id);
      if (!mainCategory) {
        return NextResponse.json(
          { message: "Main category not found" },
          { status: 404 }
        );
      }
    }
    
    // Check if another subcategory already has this name or slug
    const duplicateSubCategory = await SubCategory.findOne({
      _id: { $ne: id },
      $or: [{ name }, { slug }]
    });
    
    if (duplicateSubCategory) {
      return NextResponse.json(
        { message: "Another subcategory with this name or slug already exists" },
        { status: 400 }
      );
    }
    
    const updateData: any = {
      name,
      slug,
      canonical: canonical || null,
      metatitle: metatitle || null,
      metadesc: metadesc || null,
      h1: h1 || null,
      image: image || null
    };
    
    if (main_category_id) {
      updateData.main_category_id = main_category_id;
    }
    
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate("main_category_id", "name slug");
    
    return NextResponse.json(
      { 
        subCategory: updatedSubCategory, 
        message: "Subcategory updated successfully" 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update subcategory error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update subcategory" },
      { status: 500 }
    );
  }
}