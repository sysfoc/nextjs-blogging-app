import SubCategory from "@/app/model/SubCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, metaTitle, metaDescription, h1Title, category } = await req.json();
  if (!name || !metaTitle || !metaDescription || !h1Title || !category) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }
  const slug = name.toLowerCase().replace(/ /g, "-");
  try {
    const subcategory = await SubCategory.create({
      name,
      slug,
      metaTitle,
      metaDescription,
      h1Title,
      category,
    });
    return NextResponse.json({ subcategory }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
