import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const API = 'https://api.escuelajs.co/api/v1';

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setCargando(false);
      });
  }, [id]);

  if (cargando) return <Loading />;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="pagina-detalle">
      <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detalle-contenido">
        <div className="detalle-galeria">
          <img
            src={producto.images[0]}
            alt={producto.title}
            className="detalle-imagen-principal"
          />
        </div>

        <div className="detalle-info">
          <h1>{producto.title}</h1>
          <p className="detalle-precio">{producto.price} €</p>
          <p className="detalle-categoria">
            Categoría: <strong>{producto.category.name}</strong>
          </p>
          <p className="detalle-descripcion">{producto.description}</p>
          <button
            className="btn-primario btn-grande"
            onClick={() => { agregarAlCarrito(producto); navigate('/carrito'); }}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
