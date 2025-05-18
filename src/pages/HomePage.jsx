import { useState } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Toast from "../components/Toast"; // 👈 importato

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // 👈 stato per toast

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ message: "Azione completata con successo!", type: "success" });

      // Auto-close dopo 3s
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1>
        Welcome to <span style={{ color: "#c1ff00" }}>MySpendr</span>
      </h1>
      <p className="text-muted" style={{ marginBottom: "2rem" }}>
        Questa è una demo UI con i tuoi stili personalizzati
      </p>

      <div
        style={{
          background: "#1e1e1e",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          marginBottom: "40px",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Simulazione Azione</h3>
        <Button onClick={handleSubmit}>Esegui</Button>
        {loading && <Loader />}
      </div>

      <h4 style={{ marginBottom: "1rem" }}>Pulsanti Varianti</h4>
      <Button>Primary</Button>{' '}
      <Button variant="ghost">Ghost</Button>{' '}
      <Button variant="danger">Danger</Button>

      <div
        className="text-muted"
        style={{
          marginTop: "3rem",
          fontSize: "0.9rem",
          borderTop: "1px solid #333",
          paddingTop: "1rem",
        }}
      >
        MySpendr UI Test — Versione base
      </div>

      {/* TOAST visibile solo se presente */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
