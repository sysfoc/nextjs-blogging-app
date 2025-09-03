import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  blogId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  comment: string;
}

const commentSchema = new Schema<IComment>(
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
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
