import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ totalArticulos }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">TiendaReact</Link>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>

        <Link to="/carrito" className="navbar-carrito">
          Carrito
          {totalArticulos > 0 && (
            <span className="badge">{totalArticulos}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
