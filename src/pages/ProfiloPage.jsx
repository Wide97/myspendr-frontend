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
import UserNavbar from "./UserNavbar";
import { useCapitale } from "../context/CapitaleContext";

const ProfiloPage = () => {
  const [profilo, setProfilo] = useState(null);
  const { capitale, setCapitale } = useCapitale();
  const [entrate, setEntrate] = useState(0);
  const [uscite, setUscite] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [p, e, u] = await Promise.all([
          getProfilo(),
          getTotaleEntrate(),
          getTotaleUscite(),
        ]);
        setProfilo(p);
        setEntrate(e);
        setUscite(u);

        if (!capitale) {
          const c = await getCapitale();
          setCapitale(c);
        }
      } catch (error) {
        console.error("Errore nel caricamento profilo:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !profilo) {
    return <Loader />;
  }


  return (
    <>
      <UserNavbar />
      <div className="profilo-container">
        <h2>👤 Profilo Utente</h2>
        <div className="profilo-section text-center">
          <p>
            <strong>Email:</strong> {profilo.email}
          </p>
          <p>
            <strong>Email verificata:</strong>{" "}
            {profilo.emailConfirmed ? "✅ Sì" : "❌ No"}
          </p>
          {profilo.ultimoLogin && (
            <p>
              <strong>Ultimo login:</strong>{" "}
              {new Date(profilo.ultimoLogin).toLocaleString()}
            </p>
          )}
          {profilo.dataRegistrazione && (
            <p>
              <strong>Registrato il:</strong>{" "}
              {new Date(profilo.dataRegistrazione).toLocaleDateString()}
            </p>
          )}
          {!profilo.emailConfirmed && (
            <p className="warning-text">
              ⚠️ Verifica la tua email per usare tutte le funzionalità.
            </p>
          )}
        </div>

        <h3>💰 Capitale</h3>
        <div className="profilo-section text-center">
          <p>
            <strong>Conto Bancario:</strong>{" "}
            {(capitale.contoBancario ?? 0).toFixed(2)} €
          </p>
          <p>
            <strong>Liquidità:</strong> {(capitale.liquidita ?? 0).toFixed(2)} €
          </p>
          <p>
            <strong>Altri Fondi:</strong>{" "}
            {(capitale.altriFondi ?? 0).toFixed(2)} €
          </p>
        </div>

        <h3>📊 Statistiche</h3>
        <div className="profilo-section text-center">
          <p>
            <strong>Entrate totali:</strong> {(entrate ?? 0).toFixed(2)} €
          </p>
          <p>
            <strong>Uscite totali:</strong> {(uscite ?? 0).toFixed(2)} €
          </p>
        </div>

        <div className="profilo-actions">
          <Button onClick={() => (window.location.href = "/reset-password")}>
            🔐 Cambia Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfiloPage;
