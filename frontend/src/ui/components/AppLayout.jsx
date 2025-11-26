import { useState } from "react";
import "../pages/HomePage.css";
import Sidebar from "./Sidebar";

export default function AppLayout({ title, subtitle, rightArea, children }) {
  // 👉 Estado para abrir/cerrar el sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="home">
      {/* Botón de menú fijo en el borde superior derecho */}
      <button
        className="home__menu-button-fixed"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰ Menú
      </button>

      <main className="home__main">
        {(title || subtitle || rightArea) && (
          <header className="home__topbar">
            <div>
              {title && <h1 className="home__title">{title}</h1>}
              {subtitle && <p className="home__subtitle">{subtitle}</p>}
            </div>

            <div className="home__topbar-right">
              {rightArea}
            </div>
          </header>
        )}

        {children}
      </main>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
