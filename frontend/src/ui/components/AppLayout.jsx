import "../pages/HomePage.css"; 
import Sidebar from "./Sidebar";

export default function AppLayout({ title, subtitle, rightArea, children }) {
  return (
    <div className="home">

      {/* Sidebar con su propio botón flotante */}
      <Sidebar />

      <main className="home__main">
        {(title || subtitle || rightArea) && (
          <header className="home__topbar">
            <div>
              {title && <h1 className="home__title">{title}</h1>}
              {subtitle && <p className="home__subtitle">{subtitle}</p>}
            </div>

            <div className="home__topbar-right">
              {rightArea}
              {/* Eliminamos el botón antiguo de menú */}
            </div>
          </header>
        )}

        {children}
      </main>
    </div>
  );
}
