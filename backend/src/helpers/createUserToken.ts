import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
  name: string;
  _id: string;
}

export const createUserToken = async (
  user: User,
  req: Request,
  res: Response
): Promise<void> => {
  // create a token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "nossosecret"
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
  });
};
