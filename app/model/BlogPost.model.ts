import mongoose, { Schema, Document } from "mongoose";

interface IBlogPost extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  blogWriter: string;
  postViews: number;
  image: string;
  viewedBy: string[];
}

export const blogPostSchema = new Schema<IBlogPost>(
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

const blogPost =
  mongoose.models.Blogpost ||
  mongoose.model<IBlogPost>("Blogpost", blogPostSchema);
export default blogPost;
