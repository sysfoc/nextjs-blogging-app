// app/model/SubCategory.model.ts
import { Schema, model, models, Document, Types } from "mongoose";
import "./MainCategory.model";

export interface ISubCategory extends Document {
  id: string;
  canonical?: string;
  metatitle?: string;
  metadesc?: string;
  h1?: string;
  main_category_id: Types.ObjectId;
  name: string;
  slug: string;
  image?: string | null;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    canonical: { type: String, trim: true },
    metatitle: { type: String, trim: true },
    metadesc: { type: String, trim: true },
    h1: { type: String, trim: true },
    id: { type: String, required: true, unique: true },

    main_category_id: {
      type: Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true,
    },

    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

export default models.SubCategory ||
  model<ISubCategory>("SubCategory", SubCategorySchema);
