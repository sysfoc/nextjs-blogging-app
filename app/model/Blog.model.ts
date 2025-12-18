// app/model/Blog.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IBlog extends Document {
  id: string;
  title: string;
  slug: string;
  type?: string | null;
  description: string;
  image: string;
  author: string;
  timestamp?: Date | null;
  status: string;
  metatitle: string;
  metadesc: string;
  views?: string | null;
  user_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    id: { type: String, unique: true},
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },

    type: { type: String, default: null },

    description: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },

    timestamp: { type: Date, default: null },

    status: { type: String, default: "draft" },

    metatitle: { type: String, default: "This is Title" },
    metadesc: { type: String, default: "desc" },

    views: { type: String, default: null },

    created_at: { type: String },
    updated_at: { type: String },

    user_id: { type: String, default: null },
  },
  { timestamps: false }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
