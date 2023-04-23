import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
