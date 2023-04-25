import { Request, Response } from "express";
import { Pet } from "../models/Pet";
import { IUser } from "../interfaces/IUser";
import { constants } from "fs/promises";

// interface RegisterRequest extends Request {
//   body: {
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//   };
// }

export class PetController {
  static async create(req: Request, res: Response) {
    res.json({ message: "Deu certo!" });
  }
}
