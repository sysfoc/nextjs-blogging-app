// app/api/v1/dashboard/statistics/route.ts
import Blog from "@/app/model/Blog.model";
import Post from "@/app/model/Posts.model";
import Category from "@/app/model/MainCategory.model";
import Comment from "@/app/model/Comment.model";
import SubCategory from "@/app/model/SubCategory.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const users = await User.find().countDocuments();
    const posts = await Post.find().countDocuments();
    const blogs = await Blog.find().countDocuments();
    const categories = await Category.find().countDocuments();
    const subCategories = await SubCategory.find().countDocuments();
    const comments = await Comment.find().countDocuments();
    
    // To get news and general blogs separately
    const news = await Blog.find({ type: "0" }).countDocuments();
    const generalBlogs = await Blog.find({ type: "1" }).countDocuments(); // ADD THIS (optional)
    
    const data = { 
      users, 
      blogs,  // This is now correct (from Blog model)
      news,   // ADD THIS - news blogs (type: "0")
      posts,  // This is now correct (from blogPost/Posts model)
      generalBlogs,
      categories, 
      subCategories, 
      comments 
    };
    
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}