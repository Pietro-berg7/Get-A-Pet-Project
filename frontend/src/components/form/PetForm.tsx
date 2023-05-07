import React, { SyntheticEvent, ChangeEvent, useState } from "react";

import Input from "./Input";

import "./Form.css";
import { IPet } from "../../interfaces/IPet";
import Select from "./Select";

interface PetForm {
  handleSubmit: (pet: IPet) => void;
  petData?: IPet;
  btnText: string;
}

const PetForm: React.FC<PetForm> = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState<IPet>(petData || ({} as IPet));
  const [preview, setPreview] = useState<File[]>([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  const onFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files !== null) {
      setPreview(Array.from(files));
      setPet({ ...pet, images: files });
    }
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.currentTarget.name]: e.currentTarget.value });
  };

  function handleColor(e: ChangeEvent<HTMLSelectElement>) {
    setPet({
      ...pet,
      color: e.currentTarget.options[e.currentTarget.selectedIndex].text,
    });
  }

  function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    handleSubmit(pet);
  }

  const apiURL = "http://localhost:5000";

  return (
    <form onSubmit={submit} className="form_container">
      <div className="preview_pet_images">
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            Array.from(pet.images).map((image, index) => (
              <img
                src={`${apiURL}/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
      </div>
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
