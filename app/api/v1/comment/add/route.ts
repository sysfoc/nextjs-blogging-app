import Comment from "@/app/model/Comment.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, email, comment, blogId } = await req.json();
  if (!name || !email || !comment || !blogId) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }
  try {
    await Comment.create({
      name,
      email,
      comment,
      blogId,
    });
    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
