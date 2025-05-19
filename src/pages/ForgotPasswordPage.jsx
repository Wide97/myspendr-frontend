import React, { useState } from "react";
import { forgotPassword } from "../utils/apiAuth";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import "./ForgotPasswordPage.scss";
import Footer from "./Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);
    setRedirectMessage(false);
    try {
      const result = await forgotPassword(email);
      setToast({ message: result, type: "success" });
      setRedirectMessage(true);
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      setToast({
        message: err.message || "Email non valida o errore di rete",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="forgot-page">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="forgot-container">
          <h1>Hai dimenticato la password?</h1>
          <p className="subtitle">
            Inserisci la tua email, ti invieremo una nuova password temporanea.
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
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

            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Invia nuova password"}
            </Button>

            {redirectMessage && (
              <p className="redirect-info text-center">
                Verrai reindirizzato alla login tra 5 secondi...
              </p>
            )}
          </form>

          <div className="back-to-login">
            <Link to="/login">Torna al login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
