// app/api/v1/comment/get/[id]/route.ts
import Comment from "@/app/model/Comment.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  await connectToDatabase();
  
  try {
    const { id } = await context.params;
    
    const comments = await Comment.find({ postId: id })
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ comment: comments }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}