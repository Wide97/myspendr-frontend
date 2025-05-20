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
 */
export function resetPassword(data) {
  return apiFetch("/auth/reset-password", "PUT", data);
}

/**
 * 👤 Dati del profilo utente loggato
 */
export function getUserProfile() {
  return apiFetch("/users/me", "GET");
}

/**
 * ❌ Elimina account utente
 */
export function deleteAccount() {
  return apiFetch("/users/me", "DELETE");
}

/**
 * 🚪 Logout locale → cancella il token JWT dal localStorage
 */
export function logout() {
  localStorage.removeItem("jwt");
}
