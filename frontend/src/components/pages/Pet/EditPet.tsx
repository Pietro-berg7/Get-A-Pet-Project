import React, { useState, useEffect } from "react";
import PetForm from "../../form/PetForm";

import "./AddPet.css";

import useFlashMessage from "../../../hooks/useFlashMessage";

const EditPet: React.FC = () => {
  return (
    <section>
      <div className="addpet_header">
        <h1>Editando o Pet: 'pet.name'</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
    </section>
  );
};

export default EditPet;
