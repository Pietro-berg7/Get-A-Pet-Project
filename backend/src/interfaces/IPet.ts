import { Document, Types } from "mongoose";
import { IUser } from "./IUser";

export interface IPet extends Document {
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
  available: boolean;
  user: Types.ObjectId | (IUser & Document);
  adopter: Types.ObjectId | (IUser & Document);
  createdAt: Date;
  updatedAt: Date;
}
