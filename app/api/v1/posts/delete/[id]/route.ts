// app/api/v1/posts/delete/[id]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import { connectToDatabase } from "@/app/utils/db";
import Post from "@/app/model/Posts.model";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await context.params;

  try {
    const post = await Post.findOne({ id });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    
    if (post.image) {
      const imagePath = path.join(process.cwd(), "public", post.image);
      try {
        await unlink(imagePath);
        console.log(`Deleted file: ${imagePath}`);
      } catch (err: any) {
        console.warn(`Failed to delete image: ${imagePath}`, err.message);
      }
    }
    
    await Post.deleteOne({ id });

    return NextResponse.json(
      { message: "Post and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting post:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
