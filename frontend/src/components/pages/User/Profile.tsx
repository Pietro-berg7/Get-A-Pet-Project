import React, { SyntheticEvent, useEffect, useState } from "react";

import "./Profile.css";
import "../../form/Form.css";
import Input from "../../form/Input";
import { IUser } from "../../../interfaces/IUser";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    image: null,
  });
  const [preview, setPreview] = useState<File | null>(null);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  const onFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    setPreview(files ? files[0] : null);
    setUser({
      ...user,
      [e.currentTarget.name as keyof IUser]: files ? files[0] : null,
    });
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, (user as any)[key]);
    });

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  const apiURL = "http://localhost:5000";

  return (
    <section className="form_container">
      <div className="profile_header">
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <img
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${apiURL}/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
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
