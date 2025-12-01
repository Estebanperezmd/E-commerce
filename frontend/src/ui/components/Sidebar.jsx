import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useAuth } from "../../app/AuthContext";


export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { auth } = useAuth();  // 👈 ahora sí existe

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop oscuro cuando el sidebar está abierto */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      {/* Sidebar deslizándose desde la derecha */}
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
  onClick={() => {
    if (!auth?.user) navigate("/login");
    else navigate("/cart");
  }}
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
