import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser & Document> = mongoose.model<IUser & Document>(
  "User",
  userSchema
);
