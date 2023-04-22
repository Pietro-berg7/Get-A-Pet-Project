import mongoose, { Schema, Model, Document, Types } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema: Schema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      required: true,
      auto: true,
    },
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
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const User: Model<IUser & Document> = mongoose.model<IUser & Document>(
  "User",
  userSchema
);
