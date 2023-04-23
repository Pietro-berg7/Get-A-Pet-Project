import { Request, Response, NextFunction } from "express";
import { getToken } from "../helpers/getToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";

interface CustomRequest extends Request {
  user?: IUser;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const verified = jwt.verify(token, "nossosecret") as JwtPayload;

    req.user = verified as IUser;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido!" });
  }
};
