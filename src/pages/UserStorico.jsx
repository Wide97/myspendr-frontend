import React, { useState, useEffect } from "react";
import { fetchReportCapitaleMensile, fetchReportCapitaleAnnuale } from "../utils/storicoUtils";
import LineChartCapitale from "../components/LineChartCapitale";
import Loader from "../components/Loader";
import "./UserStorico.scss";
import UserNavbar from "./UserNavbar";
import { useCapitale } from "../context/CapitaleContext";

const UserStorico = () => {
  const [reportMensile, setReportMensile] = useState([]);
  const [reportAnnuale, setReportAnnuale] = useState([]);
  const [showMensile, setShowMensile] = useState(true);
  const [loading, setLoading] = useState(true);
  const { capitale } = useCapitale();

  useEffect(() => {
    const fetchReports = async () => {
      if (
        !capitale ||
        (capitale.contoBancario === 0 &&
          capitale.liquidita === 0 &&
          capitale.altriFondi === 0)
      ) {
        setLoading(false); 
        return;
      }

      try {
        const mensile = await fetchReportCapitaleMensile();
        const annuale = await fetchReportCapitaleAnnuale();
        setReportMensile(mensile);
        setReportAnnuale(annuale);
      } catch (err) {
        console.error("❌ Errore nel caricamento dei report capitale:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [capitale]);

  if (loading) return <Loader />;

  if (
    !capitale ||
    (capitale.contoBancario === 0 &&
      capitale.liquidita === 0 &&
      capitale.altriFondi === 0)
  ) {
    return (
      <>
        <UserNavbar />
        <div className="container user-storico text-center">
          <h2>📈 Andamento Capitale</h2>
          <p className="alert">⚠️ Crea prima un capitale per visualizzare lo storico.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavbar />
      <div className="container user-storico">
        <h2 className="text-center">📈 Andamento Capitale</h2>

        <div className="btn-toggle-wrapper">
          <button
            className={`btn ${showMensile ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setShowMensile(true)}
          >
            Mensile
          </button>
          <button
            className={`btn ${!showMensile ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setShowMensile(false)}
          >
            Annuale
          </button>
        </div>

        {showMensile ? (
          <LineChartCapitale data={reportMensile} titolo="Andamento Capitale Mensile" />
        ) : (
          <LineChartCapitale data={reportAnnuale} titolo="Andamento Capitale Annuale" />
        )}
      </div>
    </>
  );
};

export default UserStorico;
