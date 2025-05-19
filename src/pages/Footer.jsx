import React from "react";
import "./Footer.scss";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content container  text-center">
        <div className="footer-col logo-col">
          <img src={logo} alt="MySpendr Logo" className="footer-logo" />
          <p>La tua spesa, sotto controllo.</p>
        </div>

        <div className="footer-col links-col text-center">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="mailto:contatti@myspendr.it">Contattaci</a>
          <a href="https://github.com/Wide97/myspendr-frontend" target="_blank" rel="noreferrer">GitHub</a>
        </div>

        <div className="footer-col badges-col">
          <span className="badge">1000+ utenti</span>
          <span className="badge">Design responsivo</span>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {currentYear} MySpendr. Tutti i diritti riservati. — v1.0.0</small>
      </div>
    </footer>
  );
};

export default Footer;
