// app/api/v1/sub-category/add/route.ts
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  
  const {
    name,
    main_category_id,
    canonical,
    metatitle,
    metadesc,
    h1,
    image
  } = await req.json();
  
  if (!name || !main_category_id) {
    return NextResponse.json(
      { message: "Name and main category are required" },
      { status: 400 }
    );
  }
  
  // Check if main category exists
  const mainCategory = await MainCategory.findById(main_category_id);
  if (!mainCategory) {
    return NextResponse.json(
      { message: "Main category not found" },
      { status: 404 }
    );
  }
  
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  
  try {
    // Check if subcategory with same name or slug already exists
    const existingSubCategory = await SubCategory.findOne({
      $or: [{ name }, { slug }]
    });
    
    if (existingSubCategory) {
      return NextResponse.json(
        { message: "Subcategory with this name or slug already exists" },
        { status: 400 }
      );
    }
    
   // Generate incremented subcategory id (highest one)
const allSubCategories = await SubCategory.find({}, { id: 1 }).lean();

let maxSubCategoryId = 0;
allSubCategories.forEach(sub => {
  const parsedId = parseInt(sub.id);
  if (!isNaN(parsedId) && parsedId > maxSubCategoryId) {
    maxSubCategoryId = parsedId;
  }
});

const nextid = (maxSubCategoryId + 1).toString();

    
    const subcategory = await SubCategory.create({
      name,
      slug,
      main_category_id,
      id: nextid,
      canonical: canonical || null,
      metatitle: metatitle || null,
      metadesc: metadesc || null,
      h1: h1 || null,
      image: image || null
    });
    
    return NextResponse.json(
      { subcategory, message: "Subcategory created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create subcategory" },
      { status: 500 }
    );
  }
}