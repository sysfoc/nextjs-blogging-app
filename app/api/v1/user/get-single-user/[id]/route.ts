import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  const { id } = context.params;
  connectToDatabase();
  try {
    const user = await User.findById(id).select("-password");
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
