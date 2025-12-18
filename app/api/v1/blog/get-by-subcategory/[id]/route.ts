import Post from "@/app/model/Posts.model"
import SubCategory from "@/app/model/SubCategory.model"
import { connectToDatabase } from "@/app/utils/db"
import { NextResponse } from "next/server"

export async function GET(req: Request, context: any) {
  await connectToDatabase()

  try {
    const { id } = await context.params // ✅ await added

    const posts = await Post.find({ sub_category_id: id })
      .select("-__v -userId -metaTitle -metaDescription")
      .sort({ createdAt: -1 })

    const subCategory = await SubCategory.findOne({ id })
      .populate({
        path: "main_category_id",
        select: "name slug",
      })
      .select("name slug main_category_id")

    if (!subCategory) {
      return NextResponse.json(
        { error: "Sub category not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        blogs: posts,
        subCategory,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
