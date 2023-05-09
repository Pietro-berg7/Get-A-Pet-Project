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

  return (
    <section>
      <div>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div>
        {pets.length > 0 &&
          pets.map((pet: IPet) => (
            <div>
              <p>Imagem do Pet</p>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso: </span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p>Adotado</p>
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
