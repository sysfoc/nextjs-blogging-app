// app/model/Posts.model.ts
import { Schema, model, models, Document, Types } from "mongoose";

export interface IPost extends Document {
  id: string;
  name: string;
  metadesc?: string;
  metatitle?: string;
  sub_category_id: string;
  is_trending?: string;
  title?: string;
  content?: string;
  slug: string;
  image?: string;
  networth?: string;
  networth_23?: string;
  networth_24?: string;
  networth_25?: string;
  bd?: string;
  bp?: string;
  gender?: string;
  height?: string;
  profession?: string;
  nationality?: string;
  status?: number;
  afiliateLinkData?: string;
  uploaded_by?: string;
  views?: string;
  created_at?: string;
  updated_at?: string;
  user_id: string;
}

const PostSchema = new Schema<IPost>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    metadesc: { type: String, trim: true },
    metatitle: { type: String, trim: true },

    sub_category_id: {
      type: String,
      required: true,
    },

    is_trending: { type: String, default: "0" },
    title: { type: String, trim: true },
    content: { type: String },
    slug: { type: String, required: true, unique: true, trim: true },
    image: { type: String },

    networth: String,
    networth_23: String,
    networth_24: String,
    networth_25: String,

    bd: String,
    bp: String,
    gender: String,
    height: String,
    profession: String,
    nationality: String,

    status: { type: Number, default: 1 },
    afiliateLinkData: String,
    uploaded_by: String,
    views: { type: String, default: "1" },

    created_at: { type: String },
    updated_at: { type: String },

    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

export default models.Post || model<IPost>("Post", PostSchema);
