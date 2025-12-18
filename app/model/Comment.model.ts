import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  postId: string;
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
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
