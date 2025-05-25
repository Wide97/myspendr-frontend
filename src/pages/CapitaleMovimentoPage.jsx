import React, { useState } from "react";
import {
  getCapitale,
  createCapitale,
  updateCapitale,
  resetCapitale,
  deleteCapitale,
  resetCapitaleCompleto,
  creaMovimento,
} from "../utils/capitaleMovimentoUtils";

import Toast from "../components/Toast";
import "./CapitaleMovimentoPage.scss";
import UserNavbar from "./UserNavbar";
import { useCapitale } from "../context/CapitaleContext";

const CapitaleMovimentoPage = () => {
  const { capitale, setCapitale } = useCapitale();

  const [movimento, setMovimento] = useState({
    importo: "",
    categoria: "",
    descrizione: "",
    data: "",
    tipo: "ENTRATA",
    fonte: "",
  });

  const [toast, setToast] = useState(null);

  const handleCreate = () => {
    createCapitale(capitale)
      .then(() =>
        setToast({ message: "Capitale creato correttamente", type: "success" })
      )
      .catch(() =>
        setToast({ message: "Errore nella creazione", type: "error" })
      );
  };

  const handleSaveOrUpdate = () => {
    if (!capitaleEsistente) {
      createCapitale(capitale)
        .then((res) => {
          setCapitale(res); // aggiorna lo stato globale
          setToast({ message: "Capitale creato correttamente", type: "success" });
        })
        .catch(() =>
          setToast({ message: "Errore nella creazione", type: "error" })
        );
    } else {
      updateCapitale(capitale)
        .then((res) => {
          setCapitale(res); // aggiorna lo stato globale
          setToast({
            message: "Capitale aggiornato correttamente",
            type: "success",
          });
        })
        .catch(() =>
          setToast({ message: "Errore nell’aggiornamento", type: "error" })
        );
    }
  };

  const handleResetCompleto = () => {
    resetCapitaleCompleto()
      .then((res) => {
        setCapitale(res);
        setToast({
          message: "Reset completo eseguito con successo",
          type: "success",
        });
      })
      .catch(() =>
        setToast({ message: "Errore nel reset completo", type: "error" })
      );
  };

  const handleMovimentoSubmit = (e) => {
    e.preventDefault();
    const movimentoFixato = {
      ...movimento,
      categoria: movimento.categoria.trim().toUpperCase(),
      fonte: movimento.fonte.trim().toUpperCase(),
    };
    creaMovimento(movimentoFixato)
      .then(() => {
        setToast({ message: "Movimento aggiunto", type: "success" });
        setMovimento({
          importo: "",
          categoria: "",
          descrizione: "",
          data: "",
          tipo: "ENTRATA",
          fonte: "",
        });
        return getCapitale();
      })
      .then((res) => {
        setCapitale(res);
      })
      .catch(() =>
        setToast({ message: "Errore nell’aggiunta", type: "error" })
      );

  };

  const capitaleEsistente = capitale && capitale.totale !== undefined;

  return (
    <>
      <UserNavbar />
      <div className="capitale-movimento-page text-center">
        <h2>Gestione Capitale</h2>

        <div className="capitale-valori">
          <p>💳 Conto Bancario: {capitale.contoBancario}€</p>
          <p>💵 Liquidità: {capitale.liquidita}€</p>
          <p>🔐 Altri Fondi: {capitale.altriFondi}€</p>
          <p>
            📊 Totale:{" "}
            {capitale.totale ??
              parseFloat(capitale.contoBancario || 0) +
              parseFloat(capitale.liquidita || 0) +
              parseFloat(capitale.altriFondi || 0)}
            €
          </p>
        </div>

        <div className="form capitale-form">
          <input
            type="number"
            placeholder="Conto Bancario"
            value={capitale.contoBancario}
            onChange={(e) =>
              setCapitale({ ...capitale, contoBancario: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Liquidità"
            value={capitale.liquidita}
            onChange={(e) =>
              setCapitale({ ...capitale, liquidita: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Altri Fondi"
            value={capitale.altriFondi}
            onChange={(e) =>
              setCapitale({ ...capitale, altriFondi: e.target.value })
            }
          />

          <div className="capitale-buttons">
            <button className="glow" onClick={handleSaveOrUpdate}>
              {capitaleEsistente ? "Aggiorna Capitale" : "Crea Capitale"}
            </button>
            {capitaleEsistente && (
              <button className="glow danger" onClick={handleResetCompleto}>
                Reset Completo
              </button>
            )}
          </div>

        </div>

        <h2>Aggiungi Movimento</h2>

        {capitaleEsistente ? (
          <form
            className="form movimento-form"
            onSubmit={handleMovimentoSubmit}
          >
            <input
              type="number"
              placeholder="Importo"
              value={movimento.importo}
              onChange={(e) =>
                setMovimento({ ...movimento, importo: e.target.value })
              }
              required
            />
            <select
              value={movimento.categoria}
              onChange={(e) =>
                setMovimento({ ...movimento, categoria: e.target.value })
              }
              required
            >
              <option value="">Categoria</option>
              <option value="CIBO">Cibo</option>
              <option value="TRASPORTI">Trasporti</option>
              <option value="AFFITTO">Affitto</option>
              <option value="SHOPPING">Shopping</option>
              <option value="SIGARETTE">Sigarette</option>
              <option value="STIPENDIO">Stipendio</option>
              <option value="TORNEI">Tornei</option>
              <option value="SERATE">Serate</option>
              <option value="DIVERTIMENTO">Divertimento</option>
              <option value="BEAUTY">Beauty</option>
              <option value="SALUTE">Salute</option>
              <option value="INVESTIMENTI">Investimenti</option>
              <option value="ALTRO">Altro</option>
            </select>

            <input
              type="text"
              placeholder="Descrizione"
              value={movimento.descrizione}
              onChange={(e) =>
                setMovimento({ ...movimento, descrizione: e.target.value })
              }
            />
            <input
              type="date"
              value={movimento.data}
              onChange={(e) =>
                setMovimento({ ...movimento, data: e.target.value })
              }
              required
            />

            <div className="tipo-select">
              <label>
                <input
                  type="radio"
                  value="ENTRATA"
                  checked={movimento.tipo === "ENTRATA"}
                  onChange={(e) =>
                    setMovimento({ ...movimento, tipo: e.target.value })
                  }
                />
                Entrata
              </label>
              <label>
                <input
                  type="radio"
                  value="USCITA"
                  checked={movimento.tipo === "USCITA"}
                  onChange={(e) =>
                    setMovimento({ ...movimento, tipo: e.target.value })
                  }
                />
                Uscita
              </label>
              <select
                value={movimento.fonte}
                onChange={(e) =>
                  setMovimento({ ...movimento, fonte: e.target.value })
                }
                required
              >
                <option value="">Fonte</option>
                <option value="BANCA">Conto Bancario</option>
                <option value="CONTANTI">Contanti</option>
                <option value="ALTRI">Altri Fondi</option>
              </select>
            </div>

            <button className="glow" type="submit">
              Aggiungi Movimento
            </button>
          </form>
        ) : (
          <p className="alert" style={{ color: "#ff4d4f", marginTop: "1rem" }}>
            ⚠️ Crea prima un capitale per aggiungere movimenti.
          </p>
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
};

export default CapitaleMovimentoPage;
