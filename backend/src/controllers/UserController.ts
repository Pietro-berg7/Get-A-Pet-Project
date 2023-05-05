import { Request, Response } from "express";
import { createUserToken } from "../helpers/createUserToken";
import { getToken } from "../helpers/getToken";
import { getUserByToken } from "../helpers/getUserByToken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validateRegister, validateLogin } from "../middlewares/validations";
import { verifyToken } from "../middlewares/verifyToken";
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

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

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
    let currentUser: IUser | null = null;

    if (req.headers.authorization) {
      const token = getToken(req);

      if (token) {
        const decoded = jwt.verify(token, "nossosecret") as JwtPayload;

        currentUser = await User.findById(decoded.id).select("-password");
      }
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    return res.status(200).json({ user });
  }

  static async editUser(req: Request, res: Response) {
    // check if user exists
    const token = getToken(req);
    const user = await getUserByToken(token as string);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const { name, email, phone, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }
    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório!" });
    }
    if (!phone) {
      return res.status(422).json({ message: "O telefone é obrigatório!" });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais!",
      });
    }

    if (req.file) {
      user.image = req.file.filename;
    }

    const userExists = await User.findOne({ email: email });
    if (user.email !== email && userExists) {
      return res
        .status(404)
        .json({ message: "Por favor, utilize outro e-mail!" });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    if (password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const reqPassword = req.body.password;

      const passwordHash = await bcrypt.hash(reqPassword, salt);

      user.password = passwordHash;
    }

    try {
      // returns user updated data
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

// middlewares para validações
export const validateRegisterMiddleware = [validateRegister];
export const validateLoginMiddleware = [validateLogin];
export const verifyTokenMiddleware = [verifyToken];
