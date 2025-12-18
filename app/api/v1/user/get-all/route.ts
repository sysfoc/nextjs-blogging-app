// app/api/v1/user/get-all/route.ts
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
