import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./UserNavbar.scss";

const UserNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const username = localStorage.getItem("username") || "Utente";
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 80);
      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className={`user-navbar ${scrolled ? "scrolled" : ""} ${visible ? "visible" : "hidden"}`}>
      <div className="navbar-left">
        <NavLink to="/dashboard" className="logo-link">
          <img src={logo} alt="MySpendr" className="logo" />
          <span className="logo-text">MySpendr</span>
        </NavLink>
      </div>

      <nav className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/capitale">Capitale</NavLink>
        <NavLink to="/movimenti">Movimenti</NavLink>
        <NavLink to="/storico">Storico</NavLink>
        <NavLink to="/profilo">Profilo</NavLink>
        <NavLink to="/budget">Budget</NavLink>
        <div className="user-info">
          <span className="username">Ciao, {username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div
        className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default UserNavbar;
