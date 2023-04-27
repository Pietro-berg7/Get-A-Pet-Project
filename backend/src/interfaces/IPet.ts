import { Document, ObjectId, Types } from "mongoose";
import { IUser } from "./IUser";

export interface IPet extends Document {
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
  available: boolean;
  user: {
    _id: string;
    name: string;
    image: string | undefined;
    phone: string;
  };
  adopter: {
    _id: string;
    name: string;
    image: string | undefined;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdatePet {
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
}
