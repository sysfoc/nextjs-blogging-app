import Comment from "@/app/model/Comment.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const { id } = context.params;
  connectToDatabase();
  try {
    const comment = await Comment.find({ blogId: id });
    return NextResponse.json({ comment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
