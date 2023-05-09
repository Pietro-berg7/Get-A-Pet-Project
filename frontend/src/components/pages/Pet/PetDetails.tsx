import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../utils/api";

import useFlashMessage from "../../../hooks/useFlashMessage";

import "./PetDetails.css";

const PetDetails: React.FC = () => {
  const [pet, setPet] = useState({
    _id: "",
    name: "",
    age: "",
    weight: "",
    color: "",
    images: [],
    available: true,
    adopter: {},
  });
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  const apiURL = "http://localhost:5000";

  return (
    <>
      {pet.name && (
        <section className="pet_details_container">
          <div className="pet_details_header">
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
          </div>
          <div className="pet_images">
            {pet.images.map((image, index) => (
              <img
                src={`${apiURL}/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age}kg
          </p>
          {token ? (
            <button>Solicitar uma visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default PetDetails;
