import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import RoundedImage from "../../layout/RoundedImage";
import { IPet } from "../../../interfaces/IPet";

import "./Dashboard.css";

const MyPets: React.FC = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  const removePet = async (id: string) => {
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet: IPet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";

        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  const concludeAdoption = async (id: string) => {
    let msgType = "success";

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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
    <section>
      <div className="petlist_header">
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className="petlist_container">
        {pets.length > 0 &&
          pets.map((pet: IPet) => (
            <div className="petlist_row" key={pet._id}>
              <RoundedImage
                src={`${apiURL}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className="actions">
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className="conclude_btn"
                        onClick={() => {
                          concludeAdoption(pet._id);
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Não há Pets cadastrados</p>}
      </div>
    </section>
  );
};

export default MyPets;
