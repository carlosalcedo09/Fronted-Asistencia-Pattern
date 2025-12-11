import { useState } from "react";
import "../styles/Header.css";
import pattern from "../assets/Pattern.png";
export const Header = () => {
  const [showUserCard, setShowUserCard] = useState(false);

  const nombre_empleado = (localStorage.getItem("nombre_empleado") || "").trim().split("  ");
  const correo_empleado = (localStorage.getItem("correo_empleado") || "").trim().split(" ");
  const iniciales = nombre_empleado.map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  const toggleUserCard = () => {
    setShowUserCard(!showUserCard);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/" className="logo-link">
          <img src={pattern} className="img-logo" alt="logo" />
        </a>
      </div>

      <div className="header__user">
        <div className="user__avatar">{iniciales}</div>
        <div className="user__info">
          <p className="user__name">{nombre_empleado}</p>
          <span className="user__email">{correo_empleado}</span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 17"
          className="icon-chevron"
          onClick={toggleUserCard}
          style={{ cursor: "pointer" }}
        >
          <path
            fill="#1A212A"
            fillRule="evenodd"
            d="M3.529 5.816c.26-.26.682-.26.942 0L8 9.345l3.529-3.529a.667.667 0 1 1 .942.943l-4 4a.667.667 0 0 1-.942 0l-4-4a.667.667 0 0 1 0-.943"
            clipRule="evenodd"
          />
        </svg>

        {showUserCard && (
          <div className="user-card">
            <button className="close-button" onClick={toggleUserCard}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="close-icon">
                <path
                  fill="#1A212A"
                  fillRule="evenodd"
                  d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="user-card__content">
              <span className="user-card__avatar">{iniciales}</span>
              <span className="user-card__name">{nombre_empleado}</span>
              <span className="user-card__email">{correo_empleado}</span>

              <div className="user-card__actions">
                <a href="/usuario/datos-de-contacto" className="btn primary">Actualizar datos</a>
                <button className="btn secondary especial" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
