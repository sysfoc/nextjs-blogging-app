import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = context.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    if (blog.image) {
      const imagePath = path.join(process.cwd(), "public", blog.image);
      try {
        await unlink(imagePath);
        console.log(`Deleted file: ${imagePath}`);
      } catch (err: any) {
        console.warn(`Failed to delete image: ${imagePath}`, err.message);
      }
    }
    await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting blog:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
