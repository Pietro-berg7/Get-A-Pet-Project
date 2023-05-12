import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PetForm from "../../form/PetForm";
import api from "../../../utils/api";

import "./AddPet.css";

import useFlashMessage from "../../../hooks/useFlashMessage";
import { IPet } from "../../../interfaces/IPet";
import { IUser } from "../../../interfaces/IUser";

const EditPet: React.FC = () => {
  const [pet, setPet] = useState<IPet>({
    _id: "",
    name: "",
    age: "",
    weight: "",
    color: "",
    images: {} as FileList,
    available: true,
    user: {} as IUser,
    adopter: {},
  });
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  const updatedPet = async (pet: IPet) => {
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
      .patch(`pets/${pet._id}`, formData, {
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

  return (
    <section>
      <div className="addpet_header">
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatedPet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  );
};

export default EditPet;
