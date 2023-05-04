import React, { SyntheticEvent, useState } from "react";

import "./Profile.css";
import "../../form/Form.css";
import Input from "../../form/Input";
import { IUser } from "../../../interfaces/IUser";

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const onFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
    // setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="form_container">
      <div className="profile_header">
        <h1>Perfil</h1>
        <p>Preview imagem</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleChange={handleChange}
          value={user.phone || ""}
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
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
};

export default Profile;
