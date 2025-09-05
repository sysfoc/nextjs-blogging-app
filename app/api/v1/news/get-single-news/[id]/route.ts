import News from "@/app/model/News.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  connectToDatabase();
  try {
    const { id } = context.params;
    const news = await News.findOne({slug: id}).select("-__v");

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ news }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
