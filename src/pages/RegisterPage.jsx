import React, { useState } from "react";
import "./RegisterPage.scss";
import { register } from "../utils/apiAuth";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import registerImage from "../assets/login-illustration.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
const RegisterPage = () => {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      await register(form);
      setToast({
        message: "Registrazione avvenuta! Controlla l'email ✉️",
        type: "success",
      });
    } catch (err) {
      setToast({
        message: err.message || "Errore nella registrazione",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="register-container">
          <div className="image-section">
            <img src={registerImage} alt="Finance Illustration" />
          </div>

          <div className="form-section">
            <h1>
              Crea un account su{" "}
              <span className="gradient-text">MySpendr 🚀</span>
            </h1>
            <p className="subtitle">
              Inizia a gestire le tue spese in modo smart.
            </p>

            <form onSubmit={handleSubmit} className="register-form">
              {["nome", "cognome", "email", "username", "password"].map(
                (field) => (
                  <div className="input-group" key={field}>
                    <label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <div className="input-icon">
                      <i
                        className={`fa ${
                          field === "email"
                            ? "fa-envelope"
                            : field === "password"
                            ? "fa-lock"
                            : "fa-user"
                        }`}
                      />
                      <input
                        type={field === "password" ? "password" : "text"}
                        id={field}
                        name={field}
                        placeholder={`Inserisci il tuo ${field}`}
                        value={form[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )
              )}

              <Button type="submit" disabled={loading}>
                {loading ? <Loader /> : "Registrati"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
