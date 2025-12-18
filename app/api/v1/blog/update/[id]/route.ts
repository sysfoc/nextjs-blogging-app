// app/api/v1/blog/update/[id]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import Blog from "@/app/model/Blog.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await context.params;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const metatitle = formData.get("metatitle") as string | null;
  const metadesc = formData.get("metadesc") as string | null;
  const slug = formData.get("slug") as string | null;
  const author = formData.get("author") as string | null;
  const type = formData.get("type") as string | null;
  const status = formData.get("status") as string | null;
  const image = formData.get("image");

  try {
    const blogDoc = await Blog.findOne({ id });
    if (!blogDoc) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let imagePath = blogDoc.image;

    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      if (blogDoc.image) {
        const oldPath = path.join(process.cwd(), "public", blogDoc.image);
        try {
          await unlink(oldPath);
        } catch (err: any) {
          console.warn("Failed to delete old image:", err.message);
        }
      }

      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), "public", "posts", "images", filename);
      await writeFile(fullPath, buffer);
      imagePath = filename;
    }

    const updatedBlogDoc = await Blog.findOneAndUpdate(
      { id },
      {
        title,
        description,
        metatitle,
        metadesc,
        image: imagePath,
        slug,
        author,
        type: type || null,
        status,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlogDoc) {
      return NextResponse.json({ message: "Failed to update blog" }, { status: 500 });
    }

    const updatedBlog = updatedBlogDoc.toObject();

    // Fetch user manually if user_id exists - FIXED: Query by user_id field
    let user_id = null;
    if (updatedBlog.user_id) {
      const userDoc = await User.findOne({ user_id: updatedBlog.user_id }).select("name email");
      user_id = userDoc ? { name: userDoc.name, email: userDoc.email } : null;
    }

    const finalBlog = {
      ...updatedBlog,
      user_id,
    };

    return NextResponse.json({ blog: finalBlog }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}