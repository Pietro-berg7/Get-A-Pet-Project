import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PetForm from "../../form/PetForm";
import api from "../../../utils/api";

import "./AddPet.css";

import useFlashMessage from "../../../hooks/useFlashMessage";
import { IPet } from "../../../interfaces/IPet";

interface Pet extends IPet {
  _id: string;
}

const EditPet: React.FC = () => {
  const [pet, setPet] = useState<Pet>({
    _id: "",
    name: "",
    age: "",
    weight: "",
    color: "",
    images: {} as FileList,
    available: true,
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

  function updatedPet(pet: IPet): void {
    throw new Error("Function not implemented.");
  }

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
