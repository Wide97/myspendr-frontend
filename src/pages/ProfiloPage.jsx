import React, { useEffect, useState } from "react";
import {
  getCapitale,
  getTotaleEntrate,
  getTotaleUscite,
  getTuttiIMovimenti,
} from "../utils/capitaleMovimentoUtils";
import { deleteCapitale } from "../utils/capitaleMovimentoUtils";
import Toast from "../components/Toast";
import UserNavbar from "./UserNavbar";
import "./ProfiloPage.scss";

const ProfiloPage = () => {
  const [user, setUser] = useState({});
  const [capitale, setCapitale] = useState({});
  const [movimenti, setMovimenti] = useState([]);
  const [entrate, setEntrate] = useState(0);
  const [uscite, setUscite] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch("/users/me", { headers: { Authorization: localStorage.getItem("token") } })
      .then(res => res.json())
      .then(setUser);

    getCapitale().then(setCapitale);
    getTotaleEntrate().then(setEntrate);
    getTotaleUscite().then(setUscite);
    getTuttiIMovimenti().then(setMovimenti);
  }, []);

  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare il tuo account?")) {
      deleteCapitale().then(() => {
        setToast({ message: "Account eliminato", type: "success" });
        setTimeout(() => window.location.href = "/login", 1500);
      });
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="profilo-page">
        <h2>👤 Profilo Utente</h2>
        <div className="card">
          <p><strong>Nome:</strong> {user.nome}</p>
          <p><strong>Cognome:</strong> {user.cognome}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Registrato il:</strong> {user.dataRegistrazione}</p>
          <p><strong>Ultimo accesso:</strong> {user.ultimoAccesso}</p>
        </div>

        <h2>💸 Preferenze</h2>
        <div className="card">
          <p><strong>Valuta:</strong> {user.valuta?.simbolo} ({user.valuta?.codice})</p>
          <button className="glow">Modifica Password</button>
        </div>

        <h2>📊 Resoconto Rapido</h2>
        <div className="card">
          <p><strong>Totale Movimenti:</strong> {movimenti.length}</p>
          <p><strong>Entrate mese:</strong> {entrate} €</p>
          <p><strong>Uscite mese:</strong> {uscite} €</p>
          <p><strong>Capitale Totale:</strong> {capitale?.totale} €</p>
        </div>

        <h2>⚙️ Gestione Account</h2>
        <div className="card danger">
          <button className="glow" onClick={handleDelete}>Elimina Account</button>
          <button className="glow" onClick={() => localStorage.clear() || window.location.reload()}>Logout</button>
        </div>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default ProfiloPage;
