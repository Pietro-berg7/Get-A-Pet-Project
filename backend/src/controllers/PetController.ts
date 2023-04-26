import { Request, Response } from "express";
import { Pet } from "../models/Pet";
import { IUser } from "../interfaces/IUser";
import { constants } from "fs/promises";

// helpers
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";

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
    const { name, age, weight, color } = req.body;

    const available = true;

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    }

    // get pet owner
    const token = getToken(req);
    const user = getUserByToken(token as string);

    // create a pet
    const pet = new Pet({
      name: name,
      age: age,
      weight: weight,
      color: color,
      available: available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });
  }
}
