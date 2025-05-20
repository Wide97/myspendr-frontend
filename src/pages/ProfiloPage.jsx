import React, { useEffect, useState } from "react";
import {
  getProfilo,
  getCapitale,
  getTotaleEntrate,
  getTotaleUscite,
} from "../utils/profiloApi";
import Loader from "../components/Loader";
import Button from "../components/Button";
import "./ProfiloPage.scss";

const ProfiloPage = () => {
  const [profilo, setProfilo] = useState(null);
  const [capitale, setCapitale] = useState(null);
  const [entrate, setEntrate] = useState(0);
  const [uscite, setUscite] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [p, c, e, u] = await Promise.all([
          getProfilo(),
          getCapitale(),
          getTotaleEntrate(),
          getTotaleUscite(),
        ]);
        setProfilo(p);
        setCapitale(c);
        setEntrate(e);
        setUscite(u);
      } catch (error) {
        console.error("Errore nel caricamento profilo:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !profilo || !capitale) {
    return <Loader />;
  }

  return (
    <div className="profilo-container">
      <h2>👤 Profilo Utente</h2>
      <div className="profilo-section">
        <p><strong>Email:</strong> {profilo.email}</p>
        <p><strong>Email verificata:</strong> {profilo.emailConfirmed ? "✅ Sì" : "❌ No"}</p>
        {profilo.ultimoLogin && (
          <p><strong>Ultimo login:</strong> {new Date(profilo.ultimoLogin).toLocaleString()}</p>
        )}
        {profilo.dataRegistrazione && (
          <p><strong>Registrato il:</strong> {new Date(profilo.dataRegistrazione).toLocaleDateString()}</p>
        )}
        {!profilo.emailConfirmed && (
          <p className="warning-text">⚠️ Verifica la tua email per usare tutte le funzionalità.</p>
        )}
      </div>

      <h3>💰 Capitale</h3>
      <div className="profilo-section">
        <p><strong>Conto Bancario:</strong> {capitale.banca.toFixed(2)} €</p>
        <p><strong>Liquidità:</strong> {capitale.contanti.toFixed(2)} €</p>
        <p><strong>Altri Fondi:</strong> {capitale.altriFondi.toFixed(2)} €</p>
      </div>

      <h3>📊 Statistiche</h3>
      <div className="profilo-section">
        <p><strong>Entrate totali:</strong> {entrate.toFixed(2)} €</p>
        <p><strong>Uscite totali:</strong> {uscite.toFixed(2)} €</p>
      </div>

      <div className="profilo-actions">
        <Button onClick={() => window.location.href = "/reset-password"}>
          🔐 Cambia Password
        </Button>
      </div>
    </div>
  );
};

export default ProfiloPage;
