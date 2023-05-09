import { IUser } from "./IUser";

export interface IPet {
  _id: string;
  name: string;
  age: string;
  weight: string;
  color: string;
  images: FileList;
  available: boolean;
  user: IUser;
  adopter?: object;
}
