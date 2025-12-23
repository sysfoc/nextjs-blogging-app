// app/api/v1/search/route.ts
import Post from "@/app/model/Posts.model";
import Blog from "@/app/model/Blog.model";
import SubCategory from "@/app/model/SubCategory.model";
import MainCategory from "@/app/model/MainCategory.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDatabase();
  
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    
    if (!query || query.trim() === "") {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    // Split query into words for better matching
    const queryWords = query.trim().split(/\s+/).filter(word => word.length > 0);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create search conditions with word boundaries for more precise matching
    const createSearchConditions = (fields: string[]) => {
      return {
        $or: [
          // Exact phrase match (highest priority)
          ...fields.map(field => ({
            [field]: { $regex: `\\b${escapedQuery}\\b`, $options: "i" }
          })),
          // Starts with query (high priority)
          ...fields.map(field => ({
            [field]: { $regex: `^${escapedQuery}`, $options: "i" }
          })),
          // Contains all words (medium priority)
          ...(queryWords.length > 1 ? [{
            $and: queryWords.map(word => ({
              $or: fields.map(field => ({
                [field]: { $regex: word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" }
              }))
            }))
          }] : []),
          // Contains query anywhere (lowest priority)
          ...fields.map(field => ({
            [field]: { $regex: escapedQuery, $options: "i" }
          }))
        ]
      };
    };

    // Search in Posts with relevance scoring
    const posts = await Post.find(createSearchConditions(["title", "name"]))
      .select("id name slug title image sub_category_id created_at")
      .sort({ created_at: -1 })
      .limit(10)
      .lean();

    // Search in Blogs with relevance scoring
    const blogs = await Blog.find(createSearchConditions(["title"]))
      .select("id title slug image type created_at")
      .sort({ created_at: -1 })
      .limit(10)
      .lean();

    // Calculate relevance score
    const calculateRelevance = (text: string, searchQuery: string, words: string[]) => {
      if (!text) return 0;
      
      const lowerText = text.toLowerCase();
      const lowerQuery = searchQuery.toLowerCase();
      let score = 0;

      // Exact match (highest score)
      if (lowerText === lowerQuery) {
        score += 100;
      }
      
      // Starts with query
      else if (lowerText.startsWith(lowerQuery)) {
        score += 50;
      }
      
      // Contains exact phrase with word boundaries
      else if (new RegExp(`\\b${lowerQuery}\\b`, 'i').test(lowerText)) {
        score += 30;
      }
      
      // Contains all words
      else if (words.every(word => lowerText.includes(word.toLowerCase()))) {
        score += 20;
      }
      
      // Contains some words
      else {
        const matchingWords = words.filter(word => 
          lowerText.includes(word.toLowerCase())
        ).length;
        score += (matchingWords / words.length) * 10;
      }

      return score;
    };

    // Process Posts with categories
    let processedPosts: any[] = [];
    if (posts.length > 0) {
      const subCategoryIds = [...new Set(posts.map((p) => p.sub_category_id))];
      const subCategories = await SubCategory.find({ id: { $in: subCategoryIds } })
        .select("id name slug main_category_id")
        .lean();

      const subCategoryMap = Object.fromEntries(
        subCategories.map((sc) => [sc.id, sc])
      );

      const mainCategoryIds = [...new Set(subCategories.map((sc) => sc.main_category_id))];
      const mainCategories = await MainCategory.find({ _id: { $in: mainCategoryIds } })
        .select("_id name slug")
        .lean();

      const mainCategoryMap = Object.fromEntries(
        mainCategories.map((mc) => [(mc._id as any).toString(), mc])
      );

      processedPosts = posts.map((post) => {
        const subCategory = subCategoryMap[post.sub_category_id];
        const mainCategory = subCategory
          ? mainCategoryMap[(subCategory.main_category_id as any).toString()]
          : null;

        const title = post.title || post.name;
        const relevance = calculateRelevance(title, query, queryWords);

        return {
          id: post.id,
          title: title,
          slug: post.slug,
          image: post.image,
          created_at: post.created_at,
          type: "post",
          url: `/category/${mainCategory?.slug}/${subCategory?.slug}/${post.slug}`,
          category: mainCategory?.name || "",
          subCategory: subCategory?.name || "",
          relevance
        };
      });
    }

    // Process Blogs
    const processedBlogs = blogs.map((blog) => {
      const relevance = calculateRelevance(blog.title, query, queryWords);
      
      return {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        image: blog.image,
        created_at: blog.created_at,
        type: blog.type === "0" ? "news" : "general",
        url: `/blog/${blog.slug}`,
        category: blog.type === "0" ? "News" : "General",
        subCategory: "",
        relevance
      };
    });

    // Combine, filter by minimum relevance, and sort by relevance then date
    const allResults = [...processedPosts, ...processedBlogs]
      .filter(result => result.relevance > 5) // Filter out very low relevance results
      .sort((a, b) => {
        // First sort by relevance
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance;
        }
        // Then by date if relevance is equal
        const dateA = new Date(a.created_at.replace(" ", "T")).getTime();
        const dateB = new Date(b.created_at.replace(" ", "T")).getTime();
        return dateB - dateA;
      })
      .slice(0, 10) // Limit to 10 total results
      .map(({ relevance, ...rest }) => rest); // Remove relevance score from response

    return NextResponse.json({ results: allResults }, { status: 200 });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}