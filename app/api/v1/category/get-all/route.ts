import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
