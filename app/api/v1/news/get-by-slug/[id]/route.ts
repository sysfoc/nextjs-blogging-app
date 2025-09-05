import News from "@/app/model/News.model";
import { connectToDatabase } from "@/app/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitorId")?.value;
    const news = await News.findOne({ slug: id });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    if (visitorId) {
      await News.updateOne(
        { slug: id, viewedBy: { $ne: visitorId } },
        { $inc: { postViews: 1 }, $push: { viewedBy: visitorId } }
      );
    }

    return NextResponse.json({ news }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
