import React from 'react';
import { useNavigate } from 'react-router-dom';

function Carrito({ carrito, quitarDelCarrito, setCarrito }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <div className="pagina-carrito">
        <h1>Tu carrito</h1>
        <p className="carrito-vacio">Tu carrito está vacío.</p>
        <button className="btn-primario" onClick={() => navigate('/')}>
          Ver productos
        </button>
      </div>
    );
  }

  function handleFinalizar() {
    setCarrito([]);
    alert('¡Pedido realizado con éxito!');
    navigate('/');
  }

  return (
    <div className="pagina-carrito">
      <h1>Tu carrito</h1>

      <div className="carrito-lista">
        {carrito.map(item => (
          <div key={item.id} className="carrito-item">
            <img src={item.images[0]} alt={item.title} className="carrito-item-imagen" />

            <div className="carrito-item-info">
              <h3>{item.title}</h3>
              <p>{item.price} € x {item.cantidad}</p>
            </div>

            <p className="carrito-item-subtotal">
              {(item.price * item.cantidad).toFixed(2)} €
            </p>

            <button className="btn-eliminar" onClick={() => quitarDelCarrito(item.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-resumen">
        <p className="carrito-total">Total: <strong>{total.toFixed(2)} €</strong></p>
        <button className="btn-primario btn-grande" onClick={handleFinalizar}>
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}

export default Carrito;
