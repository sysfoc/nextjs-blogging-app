// app/api/v1/blog/get-by-slug/[slug]/route.ts
import Post from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = await context.params;
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitorId")?.value;

    // 1️⃣ Fetch the blog post (no populate on string fields)
    const blogDoc = await Post.findOne({ slug: id })
      .populate("user_id", "name email")
      .select("-__v");

    if (!blogDoc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blog = blogDoc.toObject();

    // 2️⃣ Manually fetch subcategory using string-based sub_category_id
    const subCategoryDoc = await SubCategory.findOne({ id: blog.sub_category_id })
      .populate("main_category_id", "name slug")
      .select("id name slug main_category_id");

    // 3️⃣ Build the subcategory and category objects
    const subCategory = subCategoryDoc
      ? {
          id: subCategoryDoc.id,
          name: subCategoryDoc.name,
          slug: subCategoryDoc.slug,
        }
      : null;

    const category = subCategoryDoc?.main_category_id
      ? {
          name: (subCategoryDoc.main_category_id as any).name,
          slug: (subCategoryDoc.main_category_id as any).slug,
        }
      : null;

    // 4️⃣ Handle view tracking
    if (visitorId) {
      await Post.updateOne(
        { slug: id, viewedBy: { $ne: visitorId } },
        { $inc: { postViews: 1 }, $push: { viewedBy: visitorId } }
      );
    }

    // 5️⃣ Construct final response
    const finalBlog = {
      ...blog,
      subCategory,
      category,
    };

    return NextResponse.json({ blog: finalBlog }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}