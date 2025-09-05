import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  subCategory: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  blogWriter: string;
  postViews: number;
  image: string;
  isEditorPick: boolean;
  viewedBy: string[];
}

export const blogSchema = new Schema<IBlog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    blogWriter: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    isEditorPick: {
      type: Boolean,
      default: false,
    },
    postViews: {
      type: Number,
      default: 0,
    },
    viewedBy: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;
