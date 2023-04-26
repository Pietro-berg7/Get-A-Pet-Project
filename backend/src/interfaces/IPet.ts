import { Document, Types } from "mongoose";
import { IUser } from "./IUser";

export interface IPet extends Document {
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
  available: boolean;
  user: IUser["_id"] | IUser;
  adopter: IUser["_id"] | IUser;
  createdAt: Date;
  updatedAt: Date;
}
