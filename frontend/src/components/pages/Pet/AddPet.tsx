import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

import useFlashMessage from "../../../hooks/useFlashMessage";

import PetForm from "../../form/PetForm";

import "./AddPet.css";

const AddPet: React.FC = () => {
  return (
    <section className="addpet_header">
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;
