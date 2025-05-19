import React from "react";
import "./ProfiloPage.scss";
import UserNavbar from "./UserNavbar";

const ProfiloPage = () => {
  return (
    <>
      <UserNavbar />
      <div className="profilo-page container">
        <h2>Il mio profilo</h2>
        <p>
          Benvenuto nella tua area personale. Qui potrai gestire i tuoi dati e
          le tue preferenze.
        </p>
      </div>
    </>
  );
};

export default ProfiloPage;
