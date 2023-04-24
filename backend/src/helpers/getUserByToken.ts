import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../models/User";

// get user by jwt token
export const getUserByToken = async (token: string) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  const decoded = jwt.verify(token, "nossosecret") as JwtPayload;

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
}