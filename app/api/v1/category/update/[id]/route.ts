import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: any) {
  const { id } = context.params;
  const { name, metaTitle, metaDescription, h1Title } = await req.json();
  connectToDatabase();
  try {
    await Category.findByIdAndUpdate(
      id,
      { name, metaTitle, metaDescription, h1Title },
      { new: true }
    );
    return NextResponse.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
