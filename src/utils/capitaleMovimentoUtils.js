import { apiFetch } from "./api";

/* ─────────────── 🏦 CAPITALE ─────────────── */

/**
 * 🔎 Recupera il capitale attuale
 */
export function getCapitale() {
  return apiFetch("/capitale", "GET");
}

/**
 * ➕ Crea nuovo capitale (se non esiste ancora)
 * @param {Object} data - { contoBancario, liquidita, altriFondi }
 */
export function createCapitale(data) {
  return apiFetch("/capitale", "POST", data);
}

/**
 * 🔁 Aggiorna capitale esistente
 * @param {Object} data - { contoBancario, liquidita, altriFondi }
 */
export function updateCapitale(data) {
  return apiFetch("/capitale", "PUT", data);
}

/**
 * 🧨 Resetta il capitale a 0
 */
export function resetCapitale() {
  return apiFetch("/capitale/reset", "PUT");
}

/* ─────────────── 💸 MOVIMENTI ─────────────── */

/**
 * ➕ Aggiunge un nuovo movimento (entrata o uscita)
 * @param {Object} data - { importo, categoria, descrizione, data, tipo }
 */
export function creaMovimento(data) {
  return apiFetch("/movimenti", "POST", data);
}

export const deleteCapitale = () => {
  return apiFetch("/capitale", "DELETE");
};


export function resetCapitaleCompleto() {
  return apiFetch("/capitale/reset-completo", "PUT");
}


