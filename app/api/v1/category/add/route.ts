// app/api/v1/category/add/route.ts
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, metaTitle, metaDescription, h1Title } = await req.json();
  
  if (!name || !metaTitle || !metaDescription || !h1Title) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  
  try {
    // Check if category with same name or slug already exists
    const existingCategory = await MainCategory.findOne({
      $or: [{ name }, { slug }]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { message: "Category with this name or slug already exists" },
        { status: 400 }
      );
    }
    
    const category = await MainCategory.create({
      name,
      slug,
      metaTitle,
      metaDescription,
      h1Title
    });
    
    return NextResponse.json(
      { category, message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}