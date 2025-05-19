const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, method = "GET", data = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Endpoint pubblici che NON devono ricevere Authorization
  const publicEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/verify-email"
  ];

  const isPublic = publicEndpoints.some(publicUrl => endpoint.startsWith(publicUrl));

  // Se non è pubblico e il token non è stato passato, prendi dal localStorage
  if (!token && !isPublic) {
    token = localStorage.getItem("token");
  }

  // Se c'è un token e l'endpoint NON è pubblico → aggiungilo
  if (token && !isPublic) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // DEBUG: stampa la richiesta
  console.log("➡️ Chiamata API:", `${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Errore nella richiesta");
  }

  if (response.status === 204) return null;

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text(); 
  }
}
