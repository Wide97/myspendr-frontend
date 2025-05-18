import React from "react";
import "./Button.scss";

const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
