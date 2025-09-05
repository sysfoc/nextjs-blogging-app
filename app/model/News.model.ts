import mongoose, { Schema, Document } from "mongoose";

interface INews extends Document {
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

export const newsSchema = new Schema<INews>(
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

const News = mongoose.models.New || mongoose.model<INews>("New", newsSchema);
export default News;
