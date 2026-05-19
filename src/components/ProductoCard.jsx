import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductoCard({ producto, agregarAlCarrito }) {
  const navigate = useNavigate();

  const imagen = producto.images && producto.images[0]
    ? producto.images[0]
    : 'https://placehold.co/300x200';

  return (
    <div className="producto-card">
      <img src={imagen} alt={producto.title} className="producto-imagen" />
      <div className="producto-info">
        <h3 className="producto-titulo">{producto.title}</h3>
        <p className="producto-precio">{producto.price} €</p>

        <div className="producto-botones">
          <button
            className="btn-secundario"
            onClick={() => navigate(`/producto/${producto.id}`)}
          >
            Ver detalle
          </button>
          <button
            className="btn-primario"
            onClick={() => agregarAlCarrito(producto)}
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
