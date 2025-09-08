import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
  blogId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
export default Contact;
