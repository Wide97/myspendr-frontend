import { apiFetch } from "./api";

/**
 * 🔐 Login utente
 * @param {Object} credentials - { email, password }
 */
export function login(credentials) {
  return apiFetch("/auth/login", "POST", credentials);
}

/**
 * 📝 Registrazione utente
 * @param {Object} userData - { nome, cognome, email, username, password }
 */
export function register(userData) {
  return apiFetch("/auth/register", "POST", userData);
}

/**
 * 📩 Verifica email tramite token
 * @param {string} token - Token ricevuto via email
 */
export function verifyEmail(token) {
  return apiFetch(`/auth/verify-email?token=${token}`, "GET");
}

/**
 * 🔁 Richiesta nuova password (invia email)
 * @param {string} email - Email dell’utente
 */
export function forgotPassword(email) {
  return apiFetch("/auth/forgot-password", "POST", { email });
}

/**
 * 🔒 Reset della password (con autenticazione)
 * @param {Object} data - { oldPassword, newPassword }
 * @param {string} token - Token JWT nell’Authorization header
 */
export function resetPassword(data, token) {
  return apiFetch("/auth/reset-password", "PUT", data, token);
}
