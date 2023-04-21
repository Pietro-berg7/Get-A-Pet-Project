const User = require("../models/User");

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
  }
};
