import React, { useEffect, useState } from "react";
import api from "../../utils/api";

import "./Home.css";

const Home: React.FC = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section>
      <h1>Home</h1>
    </section>
  );
};

export default Home;
