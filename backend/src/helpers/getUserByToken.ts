import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../models/User";

// get user by jwt token
export const getUserByToken = async (token: string) => {
  if (!token) {
    throw new Error("Acesso negado!");
  }

  const decoded = jwt.verify(token, "nossosecret") as JwtPayload;

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};
