import React, { useEffect, useState } from "react";
import {
  getCapitale,
  getTotaleEntrate,
  getTotaleUscite,
  getTuttiIMovimenti,
  getMovimentiByRange,
} from "../utils/dashUtils";
import { getProfilo } from "../utils/profiloApi";
import InfoCard from "../components/InfoCard";
import PieChartExpenses from "../components/PieChartExpenses";
import DateRangePicker from "../components/DateRangePicker";
import Loader from "../components/Loader";
import "./DashboardPage.scss";
import UserNavbar from "./UserNavbar";
import { useCapitale } from "../context/CapitaleContext";
import TelegramQR from "../components/TelegramQR";

const DashboardPage = () => {
  const { capitale, setCapitale } = useCapitale();
  const [entrate, setEntrate] = useState(0);
  const [uscite, setUscite] = useState(0);
  const [movimenti, setMovimenti] = useState([]);
  const [filteredMovimenti, setFilteredMovimenti] = useState([]);
  const [profilo, setProfilo] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiloData = await getProfilo();
        setProfilo(profiloData);

        if (!capitale) {
          const capitaleData = await getCapitale();
          setCapitale(capitaleData);
        }

        const entrate = await getTotaleEntrate();
        const uscite = await getTotaleUscite();
        const movimenti = await getTuttiIMovimenti();

        setEntrate(entrate);
        setUscite(uscite);
        setMovimenti(movimenti);
      } catch (error) {
        console.error("Errore nel caricamento dati:", error);
      } finally {
        setLoading(false);
      }
    };

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
      <UserNavbar />
      <div className="dashboard container">
        <header className="dashboard-header">
          <h1>Ciao, {profilo?.nome || "Utente"} 👋</h1>
          <p className="data">{today}</p>
        </header>

        <section className="dashboard-cards">
          <InfoCard label="Capitale Totale" value={capitaleTotale} icon="💰" />
          <InfoCard label="Entrate Totali" value={entrate} icon="📈" />
          <InfoCard label="Uscite Totali" value={uscite} icon="📉" />
          <InfoCard label="Saldo Netto" value={saldoNetto} icon="🧾" />
        </section>

        <section className="dashboard-telegram">
          <h2 className="text-center mb-3">Collega il tuo bot Telegram</h2>
          {profilo?.telegramToken && (
            <TelegramQR telegramToken={profilo.telegramToken} />
          )}
        </section>

        <section className="dashboard-chart">
          <h2>Distribuzione Spese</h2>
          <PieChartExpenses movimenti={movimenti} />
        </section>

        <section className="dashboard-filter">
          <h2 className="text-center">Filtra per intervallo di date</h2>

          <div className="filter-form-wrapper">
            <DateRangePicker onFilter={handleRangeFilter} />
          </div>

          {filteredMovimenti.length > 0 && (
            <div className="dashboard-movimenti">
              <div>
                <h3>Movimenti nel periodo:</h3>
                <ul>
                  {filteredMovimenti.map((mov) => (
                    <li key={mov.id}>
                      <strong>{mov.categoria}</strong> - {mov.importo}€ ({mov.data})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
