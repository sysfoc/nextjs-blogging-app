import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import SubCategory from "@/app/model/SubCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { unlink } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function DELETE(req: Request, context: any) {
  const { id } = context.params;
  connectToDatabase();
  try {
    const blogs = await Blog.find({ category: id });
    for (const blog of blogs) {
      if (blog.image) {
        const imagePath = path.join(process.cwd(), "public", blog.image);
        try {
          await unlink(imagePath);
          console.log(`Deleted file: ${imagePath}`);
        } catch (err: any) {
          console.warn(`Failed to delete image: ${imagePath}`, err.message);
        }
      }
    }
    await Category.findByIdAndDelete(id);
    await SubCategory.deleteMany({ category: id });
    await Blog.deleteMany({ category: id });
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
