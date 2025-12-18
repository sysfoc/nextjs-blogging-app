// app/model/MainCategory.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IMainCategory extends Document {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
}

const MainCategorySchema = new Schema<IMainCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    metaTitle: { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    h1Title: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default models.MainCategory || model<IMainCategory>("MainCategory", MainCategorySchema);