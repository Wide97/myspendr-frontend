import { apiFetch } from "./api"; 

export async function fetchReportCapitaleMensile() {
  return await apiFetch("/capitale/report/mensile");
}

export async function fetchReportCapitaleAnnuale() {
  return await apiFetch("/capitale/report/annuale");
}
