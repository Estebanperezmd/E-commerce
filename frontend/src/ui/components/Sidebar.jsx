import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Botón flotante siempre visible en el costado derecho */}
      <button
        className={`sidebar-toggle ${isOpen ? "sidebar-toggle--open" : ""}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Backdrop oscuro cuando el sidebar está abierto */}
      {isOpen && <div className="sidebar-backdrop" onClick={toggleSidebar} />}

      {/* Sidebar deslizándose desde la derecha */}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <header className="sidebar__header">
          <div className="sidebar__logo">Mi E-commerce</div>
          <button className="sidebar__close" onClick={toggleSidebar}>
            ✕
          </button>
        </header>

        <nav className="sidebar__nav">
          <button className="sidebar__item" onClick={() => goTo("/home")}>
            Inicio
          </button>

          <button
            className="sidebar__item"
            onClick={() => goTo("/cart")}
          >
            Carritos compartidos
          </button>

          <button className="sidebar__item" onClick={() => goTo("/profile")}>
            Perfil
          </button>
        </nav>

        <div className="sidebar__bottom">
          <button
            className="sidebar__logout"
            onClick={() => goTo("/")}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
