const createUserToken = require("../helpers/createUserToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
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

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res
        .status(422)
        .json({ message: "Por favor, utilize outro e-mail!" });
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    }

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
};
