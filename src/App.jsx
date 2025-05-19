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

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/capitale" element={<CapitaleMovimentoPage />} />
        <Route path="/movimenti" element={<MovimentiPage />} />
        <Route path="/profilo" element={<ProfiloPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
