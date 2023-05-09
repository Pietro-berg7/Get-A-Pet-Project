import { Request, Response } from "express";
import { Pet } from "../models/Pet";
import { IUser } from "../interfaces/IUser";
import { IPet, IUpdatePet } from "../interfaces/IPet";
import { isValidObjectId } from "mongoose";

// helpers
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";

interface RegisterRequest extends Request {
  body: {
    name: string;
    age: number;
    weight: number;
    color: string;
    available: boolean;
  };
}

export class PetController {
  static async create(req: RegisterRequest, res: Response) {
    const { name, age, weight, color } = req.body;
    const images = req.files;

    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }
    if (!age) {
      return res.status(422).json({ message: "A idade é obrigatória!" });
    }
    if (!weight) {
      return res.status(422).json({ message: "O peso é obrigatório!" });
    }
    if (!color) {
      return res.status(422).json({ message: "A cor é obrigatória!" });
    }
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(422).json({ message: "A imagem é obrigatória!" });
    }

    const available = true;

    try {
      // get pet owner
      const token = getToken(req);
      const user: IUser | null = await getUserByToken(token as string);

      if (!user) {
        res.status(401).json({ message: "Usuário não encontrado!" });
        return;
      }

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

      images.map((image) => {
        pet.images.push(image.filename);
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

  static async getAll(_req: RegisterRequest, res: Response) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({
      pets: pets,
    });
  }

  static async getAllUserPets(req: RegisterRequest, res: Response) {
    // get user from token
    const token = getToken(req);
    const user: IUser | null = await getUserByToken(token as string);

    if (!user) {
      res.status(401).json({ message: "Usuário não encontrado!" });
      return;
    }

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  }

  static async getAllUserAdoptions(req: RegisterRequest, res: Response) {
    // get user from token
    const token = getToken(req);
    const user: IUser | null = await getUserByToken(token as string);

    if (!user) {
      res.status(401).json({ message: "Usuário não encontrado!" });
      return;
    }

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  }

  static async getPetById(req: RegisterRequest, res: Response) {
    const { id } = req.params;

    // check if id is valid
    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado!" });
    }

    return res.status(200).json({
      pet: pet,
    });
  }

  static async removePetById(req: RegisterRequest, res: Response) {
    const { id } = req.params;

    // check if id is valid
    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado!" });
    }

    // get user from token
    const token = getToken(req);
    const user: IUser | null = await getUserByToken(token as string);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }

    if (typeof pet.user !== "string") {
      // check if logged in user registered the pet
      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(422).json({
          message:
            "Houve um problema ao processar sua solicitação, tente novamente mais tarde!",
        });
      }
    }

    await Pet.findByIdAndRemove(id);

    return res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  static async updatePet(req: RegisterRequest, res: Response) {
    const { id } = req.params;
    const { name, age, weight, color, available } = req.body;
    const images = req.files;

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado!" });
    }

    // get user from token
    const token = getToken(req);
    const user: IUser | null = await getUserByToken(token as string);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }

    if (typeof pet.user !== "string") {
      // check if logged in user registered the pet
      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(422).json({
          message:
            "Houve um problema ao processar sua solicitação, tente novamente mais tarde!",
        });
      }
    }

    const updatedData: IUpdatePet = {
      name,
      age,
      weight,
      color,
      images: pet.images,
    };

    // validations
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    } else {
      updatedData.name = name;
    }
    if (!age) {
      return res.status(422).json({ message: "A idade é obrigatória!" });
    } else {
      updatedData.age = age;
    }
    if (!weight) {
      return res.status(422).json({ message: "O peso é obrigatório!" });
    } else {
      updatedData.weight = weight;
    }
    if (!color) {
      return res.status(422).json({ message: "A cor é obrigatória!" });
    } else {
      updatedData.color = color;
    }
    if (Array.isArray(images)) {
      if (images.length > 0) {
        updatedData.images = [];

        images.map((image) => {
          updatedData.images.push(image.filename);
        });
      }
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }

  static async schedule(req: RegisterRequest, res: Response) {
    const { id } = req.params;

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado!" });
    }

    // get user from token
    const token = getToken(req);
    const user: IUser | null = await getUserByToken(token as string);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }

    if (typeof pet.user !== "string" && typeof pet.adopter !== "string") {
      // check if logged in user registered the pet
      if (pet.user._id.toString() === user._id.toString()) {
        return res.status(422).json({
          message: "Você não pode agendar uma visita com seu próprio Pet!",
        });
      }

      // check if user has already scheduled a visit
      if (pet.adopter) {
        if (pet.adopter._id?.toString() === user._id.toString()) {
          return res.status(422).json({
            message: "Você já agendou uma visita para este Pet!",
          });
        }
      }
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `A visita foi agendada com sucesso! Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}.`,
    });
  }

  static async concludeAdoption(req: RegisterRequest, res: Response) {
    const { id } = req.params;

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado!" });
    }

    // get user from token
    const token = getToken(req);
    const user: IUser | null = await getUserByToken(token as string);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }

    if (typeof pet.user !== "string") {
      // check if logged in user registered the pet
      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(422).json({
          message:
            "Houve um problema ao processar sua solicitação, tente novamente mais tarde!",
        });
      }
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`,
    });
  }
}
