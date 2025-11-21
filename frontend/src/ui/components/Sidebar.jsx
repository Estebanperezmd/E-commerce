import { useNavigate } from "react-router-dom";
import "./Sidebar.css";


export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <header className="sidebar__header">
          <div className="sidebar__logo">Mi E-commerce</div>
          <button className="sidebar__close" onClick={onClose}>
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
