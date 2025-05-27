import { apiFetch } from "./api";

// 📤 Imposta o aggiorna il budget per una categoria
export async function setBudget({ categoria, limite, mese, anno }) {
  return apiFetch("/budget/set", "POST", { categoria, limite, mese, anno });
}

// 📥 Recupera i dati del budget per una singola categoria
export async function getBudget(categoria, mese, anno) {
  return apiFetch(`/budget/info?categoria=${categoria}&mese=${mese}&anno=${anno}`);
}

// 📊 Recupera tutti i budget mensili dell’utente (per il grafico)
export async function getTuttiIBudget(mese, anno) {
  return apiFetch(`/budget/all?mese=${mese}&anno=${anno}`);
}
