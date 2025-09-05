import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { config } from "@/app/utils/env-config";
import jwt from "jsonwebtoken";
import User from "@/app/model/User.model";
import News from "@/app/model/News.model";

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
  const content = formData.get("content") as string | null;
  const metaTitle = formData.get("metaTitle") as string | null;
  const metaDescription = formData.get("metaDescription") as string | null;
  const slug = formData.get("slug") as string | null;
  const writer = formData.get("writer") as string | null;
  const image = formData.get("image") as File | null;

  if (
    !title ||
    !content ||
    !metaTitle ||
    !metaDescription ||
    !image ||
    !slug ||
    !writer
  ) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const existingNews = await News.findOne({ slug });
  if (existingNews) {
    return NextResponse.json(
      { message: "News already exists" },
      { status: 400 }
    );
  }
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const imagePath = path.join(process.cwd(), "public", "news", filename);
    await writeFile(imagePath, buffer);

    const news = await News.create({
      userId,
      title,
      content,
      metaTitle,
      metaDescription,
      image: `/news/${filename}`,
      slug,
      blogWriter: writer,
    });

    return NextResponse.json(
      { message: "News created successfully", news },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving news:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
