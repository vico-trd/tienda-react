import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import './App.css';

function App() {
  // al arrancar leemos el carrito guardado; si no hay nada, empezamos con array vacío
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  // cada vez que cambia el carrito lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    const yaEsta = carrito.find(item => item.id === producto.id);
    if (yaEsta) {
      // si ya está en el carrito, sumamos 1 a la cantidad
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  }

  function quitarDelCarrito(id) {
    setCarrito(carrito.filter(item => item.id !== id));
  }

  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <HashRouter>
      <Navbar totalArticulos={totalArticulos} />
      <main className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} quitarDelCarrito={quitarDelCarrito} setCarrito={setCarrito} />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;

