import React, { useEffect, useState } from "react";
import {
  fetchMovimenti,
  deleteMovimento,
  fetchTotaleEntrate,
  fetchTotaleUscite,
} from "../utils/movimentiUtils";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import InfoCard from "../components/InfoCard";
import "./MovimentiPage.scss";
import Footer from "./Footer";
import Navbar from "./Navbar";
import UserNavbar from "./UserNavbar";

const MovimentiPage = () => {
  const [movimenti, setMovimenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [entrate, setEntrate] = useState(0);
  const [uscite, setUscite] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      const [movs, inTot, outTot] = await Promise.all([
        fetchMovimenti(),
        fetchTotaleEntrate(),
        fetchTotaleUscite(),
      ]);
      setMovimenti(movs.sort((a, b) => new Date(b.data) - new Date(a.data)));
      setEntrate(inTot);
      setUscite(outTot);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setToast({ message: "Errore nel caricamento dati", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo movimento?")) {
      try {
        await deleteMovimento(id);
        setMovimenti((prev) => prev.filter((m) => m.id !== id));
        setToast({
          message: "Movimento eliminato con successo",
          type: "success",
        });
        loadData();
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setToast({ message: "Errore durante l'eliminazione", type: "error" });
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="movimenti-page container text-center">
        <h2>I tuoi movimenti</h2>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="totali-box">
              <InfoCard label="Totale Entrate" value={entrate} />
              <InfoCard label="Totale Uscite" value={uscite} />
            </div>

            {movimenti.length === 0 ? (
              <p className="no-movimenti">Nessun movimento presente</p>
            ) : (
              <table className="movimenti-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Importo</th>
                    <th>Categoria</th>
                    <th>Descrizione</th>
                    <th>Tipo</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {movimenti.map((mov) => (
                    <tr key={mov.id} className="movimento-row">
                      <td data-label="Data">{mov.data}</td>
                      <td data-label="Importo">{mov.importo} €</td>
                      <td data-label="Categoria">{mov.categoria}</td>
                      <td data-label="Descrizione">{mov.descrizione}</td>
                      <td data-label="Tipo" className={mov.tipo === "ENTRATA" ? "text-green" : "text-red"}>
                        {mov.tipo}
                      </td>
                      <td data-label="Azioni">
                        <Button onClick={() => handleDelete(mov.id)} variant="danger">
                          Elimina
                        </Button>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MovimentiPage;
