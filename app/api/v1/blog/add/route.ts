// app/api/v1/blog/add/route.ts
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import Blog from "@/app/model/Blog.model";
import path from "path";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { config } from "@/app/utils/env-config";
import jwt from "jsonwebtoken";
import User from "@/app/model/User.model";

export async function POST(req: Request) {
  await connectToDatabase();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, config.jwtSecretKey as string) as {
    id: string;
  };

  if (!decoded.id) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const userId = decoded.id;
  const formData = await req.formData();

  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const metatitle = formData.get("metatitle") as string | null;
  const metadesc = formData.get("metadesc") as string | null;
  const slug = formData.get("slug") as string | null;
  const author = formData.get("author") as string | null;
  const image = formData.get("image") as File | null;
  const type = formData.get("type") as string | null;
  const status = formData.get("status") as string | null;

  if (
    !title ||
    !description ||
    !metatitle ||
    !metadesc ||
    !image ||
    !slug ||
    !author
  ) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }

  // Use findOne with custom user_id field, not findById
  const user = await User.findOne({ user_id: userId });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    return NextResponse.json(
      { message: "Blog with this slug already exists" },
      { status: 400 }
    );
  }

  try {
    // Generate incremented blog id (highest one)
    const allBlogs = await Blog.find({}, { id: 1 }).lean();

    let maxBlogId = 0;
    allBlogs.forEach((blog) => {
      const parsedId = parseInt(blog.id);
      if (!isNaN(parsedId) && parsedId > maxBlogId) {
        maxBlogId = parsedId;
      }
    });

    const nextId = (maxBlogId + 1).toString();

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const imagePath = path.join(
      process.cwd(),
      "public",
      "posts",
      "images",
      filename
    );
    await writeFile(imagePath, buffer);

    const blog = await Blog.create({
      id: nextId,
      user_id: userId,
      title,
      description,
      metatitle,
      metadesc,
      image: filename,
      slug,
      author,
      type: type || null,
      status: status || "draft",
      timestamp: new Date(),
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
