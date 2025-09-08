import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { connectToDatabase } from "@/app/utils/db";
import blogPost from "@/app/model/BlogPost.model";
export async function PATCH(req: Request, context: any) {
  await connectToDatabase();
  const { id } = context.params;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const content = formData.get("content") as string | null;
  const metaTitle = formData.get("metaTitle") as string | null;
  const metaDescription = formData.get("metaDescription") as string | null;
  const slug = formData.get("slug") as string | null;
  const writer = formData.get("writer") as string | null;
  const image = formData.get("image");

  try {
    const blogs = await blogPost.findOne({ slug: id });
    if (!blogs) {
      return NextResponse.json({ message: "Blogs not found" }, { status: 404 });
    }

    let imagePath = blogs.image;

    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      if (blogs.image) {
        const oldPath = path.join(process.cwd(), "public", blogs.image);
        try {
          await unlink(oldPath);
        } catch (err: any) {
          console.warn("Failed to delete old image:", err.message);
        }
      }

      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(
        process.cwd(),
        "public",
        "blog-posts",
        filename
      );
      await writeFile(fullPath, buffer);

      imagePath = `/blog-posts/${filename}`;
    }

    const updatedBlogs = await blogPost.findOneAndUpdate(
      { slug: id },
      {
        title,
        content,
        metaTitle,
        metaDescription,
        image: imagePath,
        slug,
        blogWriter: writer,
      },
      { new: true }
    );

    return NextResponse.json({ blogs: updatedBlogs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
