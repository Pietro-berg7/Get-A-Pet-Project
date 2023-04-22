import { Request, Response, NextFunction } from "express";
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
      console.log(error);
      res.status(500).json({ message: error });
    }
  }

  static async login(req: LoginRequest, res: Response) {
    const { email, password } = req.body;

    // check if user exists
    const user = (await User.findOne({ email: email })) as IUser;

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    await createUserToken(user, req, res);
  }
}

// middlewares para validações
export const validateRegisterMiddleware = [validateRegister];
export const validateLoginMiddleware = [validateLogin];
