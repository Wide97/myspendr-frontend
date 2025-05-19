import React, { useEffect, useState } from "react";
import {
  getCapitale,
  createCapitale,
  updateCapitale,
  resetCapitale,
  creaMovimento,
} from "../utils/capitaleMovimentoUtils";
import Toast from "../components/Toast";
import "./CapitaleMovimentoPage.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";

const CapitaleMovimentoPage = () => {
  const [capitale, setCapitale] = useState({
    contoBancario: "",
    liquidita: "",
    altriFondi: "",
  });
  const [movimento, setMovimento] = useState({
    importo: "",
    categoria: "",
    descrizione: "",
    data: "",
    tipo: "ENTRATA",
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getCapitale()
      .then((res) => setCapitale(res))
      .catch(() =>
        setToast({ message: "Errore nel recupero del capitale", type: "error" })
      );
  }, []);

  const handleCapitaleSubmit = () => {
    const method = capitale?.id ? updateCapitale : createCapitale;
    method(capitale)
      .then(() =>
        setToast({ message: "Capitale salvato correttamente", type: "success" })
      )
      .catch(() =>
        setToast({ message: "Errore nel salvataggio", type: "error" })
      );
  };

  const handleReset = () => {
    resetCapitale()
      .then(() =>
        setCapitale({ contoBancario: 0, liquidita: 0, altriFondi: 0 })
      )
      .then(() => setToast({ message: "Capitale azzerato", type: "success" }))
      .catch(() => setToast({ message: "Errore nel reset", type: "error" }));
  };

  const handleMovimentoSubmit = (e) => {
    e.preventDefault();
    creaMovimento(movimento)
      .then(() => {
        setToast({ message: "Movimento aggiunto", type: "success" });
        setMovimento({
          importo: "",
          categoria: "",
          descrizione: "",
          data: "",
          tipo: "ENTRATA",
        });
      })
      .catch(() =>
        setToast({ message: "Errore nell’aggiunta", type: "error" })
      );
  };

  return (
    <>
      <UserNavbar/>
      <div className="capitale-movimento-page">
        <h2>Gestione Capitale</h2>
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
          <div className="buttons">
            <button className="glow" onClick={handleCapitaleSubmit}>
              Salva
            </button>
            <button className="glow danger" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <h2>Aggiungi Movimento</h2>
        <form className="form movimento-form" onSubmit={handleMovimentoSubmit}>
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
            <option value="Cibo">Cibo</option>
            <option value="Trasporti">Trasporti</option>
            <option value="Affitto">Affitto</option>
            <option value="Shopping">Shopping</option>
            <option value="Altro">Altro</option>
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
          </div>
          <button className="glow" type="submit">
            Aggiungi Movimento
          </button>
        </form>

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
