import React, { useEffect, useState } from "react";
import api from "../../utils/api";

import "./Home.css";
import { IPet } from "../../interfaces/IPet";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  const apiURL = "http://localhost:5000";

  return (
    <section>
      <div className="pet_home_header">
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className="pet_container">
        {pets.length > 0 &&
          pets.map((pet: IPet) => (
            <div className="pet_card">
              <div
                style={{
                  backgroundImage: `url(${apiURL}/images/pets/${pet.images[0]})`,
                }}
                className="pet_card_image"
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso: </span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className="adopted_text">Adotado</p>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento</p>
        )}
      </div>
    </section>
  );
};

export default Home;
