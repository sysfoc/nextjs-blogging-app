import SubCategory from "@/app/model/SubCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: any) {
  const { id } = context.params;
  const { name, metaTitle, metaDescription, h1Title, category } =
    await req.json();
  connectToDatabase();
  try {
    await SubCategory.findByIdAndUpdate(
      id,
      { name, metaTitle, metaDescription, h1Title, category },
      { new: true }
    );
    return NextResponse.json(
      { message: "Sub category updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
