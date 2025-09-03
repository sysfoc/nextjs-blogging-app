import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  blogWriter: string;
  image: string;
  category: string;
  isEditorPick: boolean;
}

export const blogSchema = new Schema<IBlog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isEditorPick: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;
