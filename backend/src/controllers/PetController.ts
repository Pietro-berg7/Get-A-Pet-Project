import { Request, Response } from "express";
import { Pet } from "../models/Pet";
import { IUser } from "../interfaces/IUser";
import { constants } from "fs/promises";

// helpers
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";
import { IPet } from "../interfaces/IPet";
import { validatePetRegister } from "../middlewares/validations";

interface RegisterRequest extends Request {
  body: {
    name: string;
    age: number;
    weight: number;
    color: string;
  };
}

export class PetController {
  static async create(req: RegisterRequest, res: Response) {
    const { name, age, weight, color } = req.body;

    const available = true;

    try {
      // get pet owner
      const token = getToken(req);
      const user: IUser | null = await getUserByToken(token as string);

      if (!user) {
        res.status(401).json({ message: "Usuário não encontrado!" });
        return;
      }

      console.log(user);

      // create a pet
      const pet: IPet = new Pet({
        name,
        age,
        weight,
        color,
        available,
        images: [],
        user: {
          _id: user._id,
          name: user.name,
          image: user.image,
          phone: user.phone,
        },
      });

      const newPet = await pet.save();

      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet: newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

// middlewares para validações
export const validatePetRegisterMiddleware = [validatePetRegister];
