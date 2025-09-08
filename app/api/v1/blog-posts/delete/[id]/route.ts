import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import { connectToDatabase } from "@/app/utils/db";
import blogPost from "@/app/model/BlogPost.model";

export async function DELETE(req: Request, context: any) {
  await connectToDatabase();
  const { id } = context.params;

  try {
    const blogs = await blogPost.findById(id);
    if (!blogs) {
      return NextResponse.json({ message: " not found" }, { status: 404 });
    }
    if (blogs.image) {
      const imagePath = path.join(process.cwd(), "public", blogs.image);
      try {
        await unlink(imagePath);
        console.log(`Deleted file: ${imagePath}`);
      } catch (err: any) {
        console.warn(`Failed to delete image: ${imagePath}`, err.message);
      }
    }
    await blogPost.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting blog:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
