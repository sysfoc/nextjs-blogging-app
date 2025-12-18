// app/api/v1/posts/add/route.ts
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { config } from "@/app/utils/env-config";
import jwt from "jsonwebtoken";
import User from "@/app/model/User.model";
import Post from "@/app/model/Posts.model";

export async function POST(req: Request) {
  await connectToDatabase();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecretKey as string) as {
      id: string;
    };

    if (!decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const userId = decoded.id;
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const metadesc = formData.get("metadesc") as string | null;
    const metatitle = formData.get("metatitle") as string | null;
    const sub_category_id = formData.get("sub_category_id") as string | null;
    const is_trending = formData.get("is_trending") as string | null;
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const slug = formData.get("slug") as string | null;
    const image = formData.get("image") as File | null;
    const networth = formData.get("networth") as string | null;
    const networth_23 = formData.get("networth_23") as string | null;
    const networth_24 = formData.get("networth_24") as string | null;
    const networth_25 = formData.get("networth_25") as string | null;
    const bd = formData.get("bd") as string | null;
    const bp = formData.get("bp") as string | null;
    const gender = formData.get("gender") as string | null;
    const height = formData.get("height") as string | null;
    const profession = formData.get("profession") as string | null;
    const nationality = formData.get("nationality") as string | null;
    const afiliateLinkData = formData.get("afiliateLinkData") as string | null;
    const uploaded_by = formData.get("uploaded_by") as string | null;

    // Validation
    if (!name || !sub_category_id || !slug) {
      return NextResponse.json(
        { message: "Name, subcategory, and slug are required" },
        { status: 400 }
      );
    }

    // Verify user exists - FIXED: Query by user_id field
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { message: "Post with this slug already exists" },
        { status: 400 }
      );
    }

    // Generate incremented post id (highest one)
    const allPosts = await Post.find({}, { id: 1 }).lean();

    let maxPostId = 0;
    allPosts.forEach((post) => {
      const parsedId = parseInt(post.id);
      if (!isNaN(parsedId) && parsedId > maxPostId) {
        maxPostId = parsedId;
      }
    });

    const nextId = (maxPostId + 1).toString();

    let imagePath = undefined;

    // Handle image upload
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
      const fullImagePath = path.join(
        process.cwd(),
        "public",
        "posts",
        "images",
        filename
      );
      await writeFile(fullImagePath, buffer);
      imagePath = filename;
    }

    // Create post
    const post = await Post.create({
      id: nextId,
      user_id: userId,
      name,
      metadesc,
      metatitle,
      sub_category_id,
      is_trending: is_trending || "0",
      title,
      content,
      slug,
      image: imagePath,
      networth,
      networth_23,
      networth_24,
      networth_25,
      bd,
      bp,
      gender,
      height,
      profession,
      nationality,
      afiliateLinkData,
      uploaded_by,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving post:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
