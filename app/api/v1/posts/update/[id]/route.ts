// app/api/v1/posts/update/[id]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { connectToDatabase } from "@/app/utils/db";
import Post, { IPost } from "@/app/model/Posts.model";
import SubCategory from "@/app/model/SubCategory.model";
import User from "@/app/model/User.model";

interface PostResponse extends Omit<IPost, "user_id" | "sub_category_id"> {
  user_id: { name: string; email: string } | null;
  sub_category: { name: string; slug: string } | null;
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await context.params;
  const formData = await req.formData();

  const name = formData.get("name") as string | null;
  const metadesc = formData.get("metadesc") as string | null;
  const metatitle = formData.get("metatitle") as string | null;
  const sub_category_id = formData.get("sub_category_id") as string | null;
  const is_trending = formData.get("is_trending") as string | null;
  const title = formData.get("title") as string | null;
  const content = formData.get("content") as string | null;
  const slug = formData.get("slug") as string | null;
  const image = formData.get("image");
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

  try {
    const postDoc = await Post.findOne({ id });
    if (!postDoc) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    let imagePath = postDoc.image;

    // Handle image upload
    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      if (postDoc.image) {
        const oldPath = path.join(process.cwd(), "public", postDoc.image);
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

    // Update post
    const updatedPostDoc = await Post.findOneAndUpdate(
      { id },
      {
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
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
      { new: true, runValidators: true }
    );

    if (!updatedPostDoc) {
      return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
    }

    const updatedPost = updatedPostDoc.toObject();

    // Fetch user manually - FIXED: Query by user_id field
    const userDoc = await User.findOne({ user_id: updatedPost.user_id }).select("name email");
    const user_id = userDoc
      ? { name: userDoc.name, email: userDoc.email }
      : null;

    // Fetch subcategory manually
    const subCategoryDoc = sub_category_id
      ? await SubCategory.findOne({ id: sub_category_id }).select("name slug")
      : null;
    const sub_category = subCategoryDoc
      ? { name: subCategoryDoc.name, slug: subCategoryDoc.slug }
      : null;

    const finalPost: PostResponse = {
      ...updatedPost,
      user_id,
      sub_category,
    };

    return NextResponse.json({ post: finalPost }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}