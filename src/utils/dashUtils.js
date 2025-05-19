import { apiFetch } from "./api";

/**
 * 🔎 Recupera i dati del capitale
 */
export function getCapitale() {
  return apiFetch("/capitale", "GET");
}

/**
 * 📥 Recupera tutti i movimenti dell’utente
 */
export function getTuttiIMovimenti() {
  return apiFetch("/movimenti", "GET");
}

/**
 * 📊 Totale entrate
 */
export function getTotaleEntrate() {
  return apiFetch("/movimenti/totale/entrate", "GET");
}

/**
 * 📉 Totale uscite
 */
export function getTotaleUscite() {
  return apiFetch("/movimenti/totale/uscite", "GET");
}

/**
 * 📆 Recupera movimenti tra due date (formato YYYY-MM-DD)
 * @param {string} start - Data inizio
 * @param {string} end - Data fine
 */
export function getMovimentiByRange(start, end) {
  return apiFetch(`/movimenti/range?start=${start}&end=${end}`, "GET");
}
