import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <div className="announcement">
        Pequeños hallazgos para disfrutar cada día.
      </div>
      <header className="header container">
        <Link className="brand" to="/" aria-label="Nido, inicio">
          nido<span>✳</span>
        </Link>
        <nav aria-label="Navegación principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/consultas">Consultas</NavLink>
        </nav>
        <span className="header-note">El gusto está en los detalles.</span>
      </header>
      <main id="contenido" className="container">
        {children}
      </main>
      <footer className="container footer">
        <Link className="brand" to="/">
          nido<span>✳</span>
        </Link>
        <p>Lo cotidiano, bien elegido.</p>
        <span>Catálogo de práctica · 2026</span>
      </footer>
    </>
  );
}
