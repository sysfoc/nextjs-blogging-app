import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import { connectToDatabase } from "@/app/utils/db";
import News from "@/app/model/News.model";

export async function DELETE(
  req: Request,
  context: any
) {
  await connectToDatabase();
  const { id } = context.params;

  try {
    const news = await News.findById(id);
    if (!news) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }
    if (news.image) {
      const imagePath = path.join(process.cwd(), "public", news.image);
      try {
        await unlink(imagePath);
        console.log(`Deleted file: ${imagePath}`);
      } catch (err: any) {
        console.warn(`Failed to delete image: ${imagePath}`, err.message);
      }
    }
    await News.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "News and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting news:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
