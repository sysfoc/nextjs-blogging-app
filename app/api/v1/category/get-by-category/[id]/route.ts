import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  const { id } = context.params;
  connectToDatabase();
  try {
    const category = await Category.findOne({ slug: id});
    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
