import React, { useEffect, useState } from "react";
import {
  getCapitale,
  getTotaleEntrate,
  getTotaleUscite,
  getTuttiIMovimenti,
  getMovimentiByRange,
} from "../utils/dashUtils";
import InfoCard from "../components/InfoCard";
import PieChartExpenses from "../components/PieChartExpenses";
import DateRangePicker from "../components/DateRangePicker";
import Loader from "../components/Loader";
import "./DashboardPage.scss";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import UserNavbar from "./UserNavbar";

const DashboardPage = () => {
  const [username, setUsername] = useState("");
  const [capitale, setCapitale] = useState(null);
  const [entrate, setEntrate] = useState(0);
  const [uscite, setUscite] = useState(0);
  const [movimenti, setMovimenti] = useState([]);
  const [filteredMovimenti, setFilteredMovimenti] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const capitale = await getCapitale();
        const entrate = await getTotaleEntrate();
        const uscite = await getTotaleUscite();
        const movimenti = await getTuttiIMovimenti();

        setCapitale(capitale);
        setEntrate(entrate);
        setUscite(uscite);
        setMovimenti(movimenti);
      } catch (error) {
        console.error("Errore nel caricamento dati:", error);
      } finally {
        setLoading(false);
      }
    };

    const extractUsername = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.sub || "Utente");
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.warn("Token non valido");
      }
    };

    extractUsername();
    fetchData();
  }, []);

  const handleRangeFilter = async (start, end) => {
    try {
      const results = await getMovimentiByRange(start, end);
      setFilteredMovimenti(results);
    } catch (err) {
      console.error("Errore nel filtraggio per date", err);
    }
  };

  if (loading) return <Loader />;

  const capitaleTotale =
    (capitale?.contoBancario || 0) +
    (capitale?.liquidita || 0) +
    (capitale?.altriFondi || 0);

  const saldoNetto = entrate - uscite;

  return (
    <>
    <UserNavbar/>
    <div className="dashboard container">
      <header className="dashboard-header">
        <h1>Ciao, {username} 👋</h1>
        <p className="data">{today}</p>
      </header>

      <section className="dashboard-cards">
        <InfoCard label="Capitale Totale" value={capitaleTotale} icon="💰" />
        <InfoCard label="Entrate Totali" value={entrate} icon="📈" />
        <InfoCard label="Uscite Totali" value={uscite} icon="📉" />
        <InfoCard label="Saldo Netto" value={saldoNetto} icon="🧾" />
      </section>

      <section className="dashboard-chart">
        <h2>Distribuzione Spese</h2>
        <PieChartExpenses movimenti={movimenti} />
      </section>

      <section className="dashboard-filter">
        <h2>Filtra per intervallo di date</h2>
        <DateRangePicker onFilter={handleRangeFilter} />
        {filteredMovimenti.length > 0 && (
          <div className="dashboard-movimenti">
            <h3>Movimenti nel periodo:</h3>
            <ul>
              {filteredMovimenti.map((mov) => (
                <li key={mov.id}>
                  <strong>{mov.categoria}</strong> - {mov.importo}€ ({mov.data})
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
    </>
  );
};

export default DashboardPage;
