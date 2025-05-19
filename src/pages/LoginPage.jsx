import React, { useState } from "react";
import "./LoginPage.scss";
import { login } from "../utils/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import loginImage from "../assets/login-illustration.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate(); // ✅ redirect post-login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username || response.nome || "Utente");

      setToast({
        message: "Accesso effettuato con successo!",
        type: "success",
      });

      // ✅ Redirect alla dashboard dopo breve attesa
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (err) {
      setToast({
        message: err.message || "Credenziali errate o server offline",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="login-container">
          <div className="image-section">
            <img src={loginImage} alt="Finance Illustration" />
          </div>

          <div className="form-section">
            <h1>
              Bentornato su <span className="gradient-text">MySpendr 💸</span>
            </h1>
            <p className="subtitle">
              Accedi per tenere traccia delle tue finanze.
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <div className="input-icon">
                  <i className="fa fa-envelope" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Inserisci la tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-icon">
                  <i className="fa fa-lock" />
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? <Loader /> : "Entra"}
              </Button>
            </form>

            <div className="login-links">
              <Link to="/forgot-password">Password dimenticata?</Link>
              <Link to="/register">Registrati ora</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
