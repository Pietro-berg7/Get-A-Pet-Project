import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/logo.png";
import "./Navbar.css";

import { Context } from "../../context/UserContext";

const Navbar: React.FC = () => {
  const { authenticated } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src={Logo} alt="Get A Pet" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <p>Logado</p>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
