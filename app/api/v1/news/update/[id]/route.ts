import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { connectToDatabase } from "@/app/utils/db";
import News from "@/app/model/News.model";

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
    const news = await News.findOne({ slug: id });
    if (!news) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    let imagePath = news.image;

    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      if (news.image) {
        const oldPath = path.join(process.cwd(), "public", news.image);
        try {
          await unlink(oldPath);
        } catch (err: any) {
          console.warn("Failed to delete old image:", err.message);
        }
      }

      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), "public", "news", filename);
      await writeFile(fullPath, buffer);

      imagePath = `/news/${filename}`;
    }

    const updatedNews = await News.findOneAndUpdate(
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

    return NextResponse.json({ news: updatedNews }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
