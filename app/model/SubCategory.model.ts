import mongoose, { Schema, Document } from "mongoose";

interface ISubCategory extends Document {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  category: mongoose.Schema.Types.ObjectId;
}
export const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    h1Title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", subCategorySchema);
export default SubCategory;
