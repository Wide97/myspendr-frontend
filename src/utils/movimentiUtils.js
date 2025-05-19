import { apiFetch } from './api';

// 🔹 Recupera tutti i movimenti dell'utente
export async function fetchMovimenti() {
  return await apiFetch('/movimenti');
}

// 🔹 Recupera movimenti per intervallo di date
export async function fetchMovimentiByRange(start, end) {
  return await apiFetch(`/movimenti/range?start=${start}&end=${end}`);
}

// 🔹 Aggiungi un nuovo movimento
export async function createMovimento(data) {
  return await apiFetch('/movimenti', 'POST', data);
}

// 🔹 Elimina un movimento per ID
export async function deleteMovimento(id) {
  return await apiFetch(`/movimenti/${id}`, 'DELETE');
}

// 🔹 Totale entrate
export async function fetchTotaleEntrate() {
  return await apiFetch('/movimenti/totale/entrate');
}

// 🔹 Totale uscite
export async function fetchTotaleUscite() {
  return await apiFetch('/movimenti/totale/uscite');
}
