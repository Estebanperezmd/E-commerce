import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Más adelante aquí borraremos token, etc.
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <span className="navbar__logo">Mi E-commerce</span>
      </div>

      <nav className="navbar__center">
        <button className="navbar__link" onClick={() => navigate("/home")}>
          Inicio
        </button>
        {/* Más adelante: /products, /cart, /orders, etc. */}
      </nav>

      <div className="navbar__right">
        <button className="navbar__logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
