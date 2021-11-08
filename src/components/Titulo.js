import React from "react";
import { Link } from "react-router-dom";

const Titulo = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <Link to="/" className="navbar-brand" href="#">
        <img src="logo.png" alt="Biblioteca de jogos" width="40" className="mr-2"/>
        Biblioteca de jogos
      </Link>
    </nav>
  );
};

export default Titulo;
