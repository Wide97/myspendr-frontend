import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./HomePage.scss";
import dash from "../assets/dash.png";
import Navbar from "../pages/Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="homepage">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Prendi il controllo delle tue finanze.</h1>
            <p>Traccia. Analizza. Risparmia.</p>
            <Button onClick={() => navigate("/register")}>Inizia ora</Button>
          </div>
          <div className="hero-image">
            <img src={dash} alt="MySpendr Dash" className="dash" />
          </div>
        </section>

        {/* Feature Section */}
        <section className="features">
          <div className="feature-card">
            <h3>Spese Giorno per Giorno</h3>
            <p>Registra ogni spesa in pochi secondi con categorie intuitive.</p>
          </div>
          <div className="feature-card">
            <h3>Dashboard con grafici chiari</h3>
            <p>Analizza l'andamento delle spese in tempo reale.</p>
          </div>
          <div className="feature-card">
            <h3>Ricevute allegate in un click</h3>
            <p>Scatta una foto e conserva tutto digitalmente.</p>
          </div>
        </section>

        <section className="badges">
          <div className="badge">1000+ utenti soddisfatti</div>
          <div className="badge">Dati sicuri</div>
          <div className="badge">Design responsive</div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
