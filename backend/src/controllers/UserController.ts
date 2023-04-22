import { Request, Response } from "express";
import { createUserToken } from "../helpers/createUserToken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { validateRegister, validateLogin } from "../middlewares/validations";
import { IUser } from "../interfaces/IUser";

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export class UserController {
  static async register(req: RegisterRequest, res: Response) {
    const { name, email, phone, password } = req.body;

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user: IUser = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async login(req: LoginRequest, res: Response) {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Não há usuário cadastrado com este e-mail!" });
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida!" });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req: Request, res: Response) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }
}

// middlewares para validações
export const validateRegisterMiddleware = [validateRegister];
export const validateLoginMiddleware = [validateLogin];
