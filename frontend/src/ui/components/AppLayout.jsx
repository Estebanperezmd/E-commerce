import { useState } from "react";
import Sidebar from "./Sidebar";
import "../pages/HomePage.css"; // reutilizamos las clases .home, .home__main, etc.

export default function AppLayout({ title, subtitle, rightArea, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="home">
      <main className="home__main">
        {(title || subtitle || rightArea) && (
          <header className="home__topbar">
            <div>
              {title && <h1 className="home__title">{title}</h1>}
              {subtitle && <p className="home__subtitle">{subtitle}</p>}
            </div>

            <div className="home__topbar-right">
              {rightArea}
              <button
                className="home__menu-button"
                onClick={() => setIsSidebarOpen(true)}
              >
                ☰ Menú
              </button>
            </div>
          </header>
        )}

        {children}
      </main>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
