import Post from "@/app/model/Posts.model";
import MainCategory from "@/app/model/MainCategory.model";
import SubCategory from "@/app/model/SubCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  await connectToDatabase();
  
  try {
    const { id } = await context.params;
    
    // Find the main category by MongoDB _id
    const mainCategory = await MainCategory.findById(id);
    if (!mainCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    
    // Find all subcategories under this main category using main_category_id (ObjectId reference)
    const subCategories = await SubCategory.find({ main_category_id: id }).select("id name slug").lean();
    
    
    if (subCategories.length === 0) {
      return NextResponse.json({ blogs: [] }, { status: 200 });
    }
    
    // Extract the custom string IDs from subcategories
    const subCategoryIds = subCategories.map(sc => sc.id);
    
    
    // Find all posts that belong to these subcategories using custom string IDs
    const posts = await Post.find({ sub_category_id: { $in: subCategoryIds } })
      .select("-__v")
      .sort({ created_at: -1 })
      .lean();

    
    // Create a map for quick subcategory lookup
    const subCategoryMap: any = {};
    subCategories.forEach(sc => {
      subCategoryMap[sc.id] = { name: sc.name, slug: sc.slug };
    });
    
    // Attach category and subcategory info to each post
    const blogsWithDetails = posts.map(post => ({
      ...post,
      category: { name: mainCategory.name, slug: mainCategory.slug },
      subCategory: subCategoryMap[post.sub_category_id] || null
    }));
    
    return NextResponse.json({ blogs: blogsWithDetails }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}