import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";

export async function PATCH(
  req: Request,
  context: any
) {
  await connectToDatabase();
  const { id } = context.params;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const content = formData.get("content") as string | null;
  const metaTitle = formData.get("metaTitle") as string | null;
  const metaDescription = formData.get("metaDescription") as string | null;
  const slug = formData.get("slug") as string | null;
  const writer = formData.get("writer") as string | null;
  const category = formData.get("category") as string | null;

  // Convert to real boolean
  const isEditorPick =
    formData.get("isEditorPick")?.toString() === "true" ? true : false;

  const image = formData.get("image");

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let imagePath = blog.image;

    // Handle new image upload
    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      // Delete old image if exists
      if (blog.image) {
        const oldPath = path.join(process.cwd(), "public", blog.image);
        try {
          await unlink(oldPath);
        } catch (err: any) {
          console.warn("Failed to delete old image:", err.message);
        }
      }

      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), "public", "blog", filename);
      await writeFile(fullPath, buffer);

      imagePath = `/blog/${filename}`;
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id }, // ✅ use _id instead of id
      {
        title,
        content,
        metaTitle,
        metaDescription,
        image: imagePath,
        slug,
        blogWriter: writer,
        category,
        isEditorPick,
      },
      { new: true }
    );

    return NextResponse.json({ blog: updatedBlog }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
