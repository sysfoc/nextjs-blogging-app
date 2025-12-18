// app/model/User.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  user_id: string;
  name: string;
  email: string;
  email_verified_at?: Date | null;
  password: string;
  remember_token?: string | null;
  image?: string | null;
  role: string | null;
}

const UserSchema = new Schema<IUser>(
  {
    user_id: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
    remember_token: { type: String, default: null },
    image: { type: String, default: null },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
