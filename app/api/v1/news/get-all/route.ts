import News from "@/app/model/News.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const news = await News.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ news }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
