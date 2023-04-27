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
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    adopter: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Pet: Model<IPet & Document> = mongoose.model<IPet & Document>(
  "Pet",
  petSchema
);
