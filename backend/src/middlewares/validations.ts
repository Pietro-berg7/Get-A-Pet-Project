import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" });
  }
  if (!confirmpassword) {
    return res
      .status(422)
      .json({ message: "A confirmação de senha é obrigatória!" });
  }
  if (password !== confirmpassword) {
    return res.status(422).json({
      message: "A senha e a confirmação de senha precisam ser iguais!",
    });
  }

  next();
};

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "O e-mail é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" });
  }

  next();
};

export const validatePetRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, age, weight, color } = req.body;

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

  next();
};
