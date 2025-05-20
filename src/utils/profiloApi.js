import { apiFetch } from "./apiUtils";

export async function getProfilo() {
  return await apiFetch("/users/me");
}

export async function getCapitale() {
  return await apiFetch("/capitale");
}

export async function getTotaleEntrate() {
  return await apiFetch("/movimenti/totale/entrate");
}

export async function getTotaleUscite() {
  return await apiFetch("/movimenti/totale/uscite");
}
