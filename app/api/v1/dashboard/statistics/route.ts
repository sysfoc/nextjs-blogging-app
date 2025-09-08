import Blog from "@/app/model/Blog.model";
import blogPost from "@/app/model/BlogPost.model";
import Category from "@/app/model/Category.model";
import Comment from "@/app/model/Comment.model";
import News from "@/app/model/News.model";
import SubCategory from "@/app/model/SubCategory.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const users = await User.find().countDocuments();
    const blogs = await blogPost.find().countDocuments();
    const posts = await Blog.find().countDocuments();
    const news = await News.find().countDocuments();
    const categories = await Category.find().countDocuments();
    const subCategories = await SubCategory.find().countDocuments();
    const comments = await Comment.find().countDocuments();
    const data = { users, blogs, posts, news, categories, subCategories, comments }
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
