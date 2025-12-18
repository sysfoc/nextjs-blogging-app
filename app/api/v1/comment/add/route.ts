// app/api/v1/comment/add/route.ts
import Comment from "@/app/model/Comment.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  
  try {
    const { name, email, comment, postId } = await req.json();
    
    if (!name || !email || !comment || !postId) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    
    const newComment = await Comment.create({
      name,
      email,
      comment,
      postId,
    });
    
    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}