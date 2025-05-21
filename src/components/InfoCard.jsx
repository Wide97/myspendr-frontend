import React from "react";
import "./InfoCard.scss";

const InfoCard = ({ label, value, icon }) => {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div className="info-details text-center">
        <p className="info-label">{label}</p>
        <p className="info-value">{value.toLocaleString("it-IT", { minimumFractionDigits: 2 })} €</p>
      </div>
    </div>
  );
};

export default InfoCard;
