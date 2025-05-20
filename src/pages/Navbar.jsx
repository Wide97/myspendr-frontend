import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.scss";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const isAuthenticated = false; // TODO: auth real
  const username = "Marco";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        visible ? "visible" : "hidden"
      }`}
    >
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="MySpendr Logo" className="logo" />
          <span className="logo-text">MySpendr</span>
        </Link>
      </div>

      <nav className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <a href="mailto:myspendr@gmail.com">Contattaci</a>
        <a
          href="https://github.com/Wide97/myspendr-frontend"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        {isAuthenticated ? (
          <div className="user-info">
            <span className="username">Ciao, {username}</span>
            <button className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-signup">
              Sign up
            </Link>
          </div>
        )}
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

export default Navbar;
