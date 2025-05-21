import React, { useState, useEffect } from "react";
import { fetchReportCapitaleMensile, fetchReportCapitaleAnnuale } from "../utils/storicoUtils";
import LineChartCapitale from "../components/LineChartCapitale";
import Loader from "../components/Loader";
import "./UserStorico.scss";
import UserNavbar from "./UserNavbar";

const UserStorico = () => {
    const [reportMensile, setReportMensile] = useState([]);
    const [reportAnnuale, setReportAnnuale] = useState([]);
    const [showMensile, setShowMensile] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
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
    }, []);

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

                {loading ? (
                    <Loader />
                ) : showMensile ? (
                    <LineChartCapitale data={reportMensile} titolo="Andamento Capitale Mensile" />
                ) : (
                    <LineChartCapitale data={reportAnnuale} titolo="Andamento Capitale Annuale" />
                )}
            </div>
        </>
    );
};

export default UserStorico;
