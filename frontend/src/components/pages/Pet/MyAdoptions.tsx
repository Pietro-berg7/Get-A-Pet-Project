import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import RoundedImage from "../../layout/RoundedImage";

import "./Dashboard.css";
import { IPet } from "../../../interfaces/IPet";

const MyAdoptions: React.FC = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  const apiURL = "http://localhost:5000";

  return (
    <section>
      <div className="petlist_header">
        <h1>Minhas adoções</h1>
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
              <div className="contacts">
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className="actions">
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há adoções de Pets.</p>}
      </div>
    </section>
  );
};

export default MyAdoptions;
