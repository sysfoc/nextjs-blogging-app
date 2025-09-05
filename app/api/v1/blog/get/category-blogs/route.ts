import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import Blog from "@/app/model/Blog.model";
import "@/app/model/Category.model";
import "@/app/model/SubCategory.model";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Blog.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoryInfo",
        },
      },
      { $unwind: "$subCategoryInfo" },
      {
        $unset: [
          "userId",
          "metaTitle",
          "metaDescription",
          "viewedBy",
          "categoryInfo.metaTitle",
          "categoryInfo.metaDescription",
          "subCategoryInfo.metaTitle",
          "subCategoryInfo.metaDescription",
        ],
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$categoryInfo._id",
          name: { $first: "$categoryInfo.name" },
          slug: { $first: "$categoryInfo.slug" },
          blogs: {
            $push: {
              _id: "$_id",
              title: "$title",
              slug: "$slug",
              blogWriter: "$blogWriter",
              image: "$image",
              isEditorPick: "$isEditorPick",
              postViews: "$postViews",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
              subCategory: {
                name: "$subCategoryInfo.name",
                slug: "$subCategoryInfo.slug",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
          blogs: { $slice: ["$blogs", 4] },
        },
      },
    ]);

    return NextResponse.json({ success: true, categories: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
