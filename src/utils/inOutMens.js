import { apiFetch } from './api';

// Recupera il totale delle entrate dell'ultimo mese
export async function getTotaleEntrateUltimoMese() {
  try {
    const response = await apiFetch('/movimenti/totale/entrate/ultimo-mese', 'GET');
    console.log('📈 Entrate ultimo mese:', response);
    return response;
  } catch (error) {
    console.error('❌ Errore recupero entrate ultimo mese:', error);
    throw error;
  }
}

// Recupera il totale delle uscite dell'ultimo mese
export async function getTotaleUsciteUltimoMese() {
  try {
    const response = await apiFetch('/movimenti/totale/uscite/ultimo-mese', 'GET');
    console.log('📉 Uscite ultimo mese:', response);
    return response;
  } catch (error) {
    console.error('❌ Errore recupero uscite ultimo mese:', error);
    throw error;
  }
}
