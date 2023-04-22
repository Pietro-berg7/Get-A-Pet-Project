import mongoose, { Schema, Model, Document } from "mongoose";
import { IPet } from "../interfaces/IPet";

const petSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    adopter: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const User: Model<IPet & Document> = mongoose.model<IPet & Document>(
  "Pet",
  petSchema
);
