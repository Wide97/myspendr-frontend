const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, method = "GET", data = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Errore nella richiesta");
  }

  return response.json();
}
