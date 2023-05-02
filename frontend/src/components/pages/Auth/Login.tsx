import React, { useState, useContext, SyntheticEvent } from "react";
import Input from "../../form/Input";

import "../../form/Form.css";

import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import { ILogin } from "../../../interfaces/ILogin";

const Login: React.FC = () => {
  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { login } = useContext(Context);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(user);
  };

  return (
    <section className="form_container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui!</Link>
      </p>
    </section>
  );
};

export default Login;
