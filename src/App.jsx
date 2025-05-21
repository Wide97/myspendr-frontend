import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import CapitaleMovimentoPage from "./pages/CapitaleMovimentoPage";
import MovimentiPage from "./pages/MovimentiPage";
import Footer from "./pages/Footer";
import "./styles/global.scss";
import ProfiloPage from "./pages/ProfiloPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerificata from "./pages/EmailVerificata";

function App() {
  return (
    <div className="app">
      {/* 🌌 Sfondo dinamico animato */}
      <div className="background-animated">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      {/* 🚀 Immagini decorative */}
      <img src="/gifs/astronauta.png" alt="Astronauta" className="astronaut-float" />
      <img src="/gifs/valuta.png" alt="valuta pulse" className="valuta-pulse" />

      {/* 🛣️ Rotte */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/capitale" element={<CapitaleMovimentoPage />} />
        <Route path="/movimenti" element={<MovimentiPage />} />
        <Route path="/profilo" element={<ProfiloPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/email-verificata" element={<EmailVerificata />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
