import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiUtils";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmailVerificata = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setToast({ message: "❌ Token mancante", type: "error" });
        setLoading(false);
        return;
      }

      try {
        const res = await apiFetch(`/auth/verify-email?token=${token}`);
        setToast({ message: res || "✅ Verifica completata", type: "success" });
        setTimeout(() => navigate("/login"), 5000);
      } catch (err) {
        setToast({ message: err.message || "❌ Token non valido o scaduto", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="container text-center" style={{ padding: "4rem 1rem" }}>
      {loading && <Loader />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {!loading && toast?.type === "success" && (
        <p>🔐 Verifica completata. Verrai reindirizzato al login...</p>
      )}
    </div>
  );
};

export default EmailVerificata;
