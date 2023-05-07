import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

import useFlashMessage from "../../../hooks/useFlashMessage";

import PetForm from "../../form/PetForm";

import "./AddPet.css";
import { IPet } from "../../../interfaces/IPet";

const AddPet: React.FC = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const registerPet = async (pet: IPet) => {
    let msgType = "success";

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formData.append(key, (pet as any)[key]);
      }
    });

    const data = await api
      .post("pets/create", formData, {
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

    if (msgType !== "error") {
      navigate("/pet/mypets");
    }
  };

  return (
    <section className="addpet_header">
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;
