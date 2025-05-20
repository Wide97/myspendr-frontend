import React, { useState } from "react";
import { resetPassword } from "../utils/apiAuth";
import Button from "../components/Button";
import Toast from "../components/Toast";
import "./ResetPasswordPage.scss";
import UserNavbar from "./UserNavbar";

const ResetPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setToast({
        message: "❌ Le nuove password non coincidono",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ oldPassword, newPassword });
      setToast({
        message: "✅ Password aggiornata con successo",
        type: "success",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setToast({ message: "Errore: " + err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="reset-password-page">
        <h2>🔒 Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Password Attuale</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nuova Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Conferma Nuova Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Aggiornamento..." : "Aggiorna Password"}
          </Button>
        </form>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default ResetPasswordPage;
