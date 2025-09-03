import SubCategory from "@/app/model/SubCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const subCategories = await SubCategory.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ subCategories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
