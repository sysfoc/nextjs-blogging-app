import Blog from "@/app/model/Blog.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const result = await Blog.aggregate([
      {
        $group: {
          _id: "$subCategory",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "_id",
          as: "subCategory",
        },
      },
      { $unwind: "$subCategory" },
      {
        $lookup: {
          from: "categories",
          localField: "subCategory.category",
          foreignField: "_id",
          as: "parentCategory",
        },
      },
      { $unwind: "$parentCategory" },
      {
        $project: {
          _id: 0,
          subCategoryName: "$subCategory.name",
          subCategorySlug: "$subCategory.slug",
          parentCategory: "$parentCategory.name",
          parentCategorySlug: "$parentCategory.slug",
          count: 1,
        },
      },
    ]);

    return NextResponse.json({ topics: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
