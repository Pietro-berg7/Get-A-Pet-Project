import React, { SyntheticEvent, ChangeEvent, useState } from "react";

import Input from "./Input";

import "./Form.css";
import { IPet } from "../../interfaces/IPet";
import Select from "./Select";

interface PetForm {
  handleSubmit: () => void;
  petData: IPet;
  btnText: string;
}

const PetForm: React.FC<PetForm> = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState<IPet>(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  const onFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
  };

  function handleColor(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e);
  }

  return (
    <form className="form_container">
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleChange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        handleChange={handleChange}
        value={pet.age || ""}
      />
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso aproximado"
        value={pet.weight || ""}
        handleChange={handleChange}
      />
      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        handleChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
};

export default PetForm;
