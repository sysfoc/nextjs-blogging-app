import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
}
export const categorySchema = new Schema<ICategory>(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);
export default Category;
