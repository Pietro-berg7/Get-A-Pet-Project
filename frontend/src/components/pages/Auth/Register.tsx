import React, { SyntheticEvent, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../form/Input";

import "../../form/Form.css";

// context
import { Context } from "../../../context/UserContext";
import { IUser } from "../../../interfaces/IUser";

const Register: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const { register } = useContext(Context);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    register(user);
  };

  return (
    <section className="form_container">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui!</Link>
      </p>
    </section>
  );
};

export default Register;
