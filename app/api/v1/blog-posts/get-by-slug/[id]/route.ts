import blogPost from "@/app/model/BlogPost.model";
import { connectToDatabase } from "@/app/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitorId")?.value;
    const blogs = await blogPost.findOne({ slug: id });

    if (!blogs) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (visitorId) {
      await blogPost.updateOne(
        { slug: id, viewedBy: { $ne: visitorId } },
        { $inc: { postViews: 1 }, $push: { viewedBy: visitorId } }
      );
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
