import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitorId")?.value;
    console.log("Visitor ID:", visitorId);
    const blog = await Blog.findOne({ slug: id })
      .populate({ path: "category", select: "name" })
      .populate({ path: "subCategory", select: "name" })
      .select("-__v -userId -viewedBy");

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (visitorId) {
      await Blog.updateOne(
        { slug: id, viewedBy: { $ne: visitorId } },
        { $inc: { postViews: 1 }, $push: { viewedBy: visitorId } }
      );
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
