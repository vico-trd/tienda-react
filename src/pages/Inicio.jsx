import React, { useState, useEffect } from 'react';
import ProductoCard from '../components/ProductoCard';
import Loading from '../components/Loading';

const API = 'https://api.escuelajs.co/api/v1';
const LIMITE = 10;

function Inicio({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [hayMas, setHayMas] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  // cargamos las categorías una sola vez al entrar
  useEffect(() => {
    fetch(`${API}/categories`)
      .then(res => res.json())
      .then(data => setCategorias(data.slice(0, 6)));
  }, []);

  // carga inicial de productos
  useEffect(() => {
    cargar(0, null);
  }, []);

  async function cargar(nuevoOffset, categoria) {
    setCargando(true);

    let url = `${API}/products?offset=${nuevoOffset}&limit=${LIMITE}`;
    if (categoria !== null) url += `&categoryId=${categoria}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length < LIMITE) setHayMas(false);
    else setHayMas(true);

    if (nuevoOffset === 0) {
      setProductos(data);
    } else {
      setProductos(prev => [...prev, ...data]);
    }

    setOffset(nuevoOffset + LIMITE);
    setCargando(false);
  }

  // scroll infinito: cuando llegamos cerca del final de la página cargamos más
  useEffect(() => {
    function handleScroll() {
      const alFondo = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (alFondo && hayMas && !cargando) {
        cargar(offset, categoriaActiva);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hayMas, cargando, offset, categoriaActiva]);

  function handleCategoria(id) {
    setCategoriaActiva(id);
    cargar(0, id);
  }

  return (
    <div className="pagina-inicio">
      <h1>Nuestros Productos</h1>

      <div className="filtro-categoria">
        <button
          className={categoriaActiva === null ? 'btn-categoria activo' : 'btn-categoria'}
          onClick={() => handleCategoria(null)}
        >
          Todas
        </button>
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={categoriaActiva === cat.id ? 'btn-categoria activo' : 'btn-categoria'}
            onClick={() => handleCategoria(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="productos-grid">
        {productos.map(producto => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      {cargando && <Loading />}

      {hayMas && !cargando && (
        <div className="cargar-mas-contenedor">
          <button className="btn-cargar-mas" onClick={() => cargar(offset, categoriaActiva)}>
            Cargar más productos
          </button>
        </div>
      )}

      {!hayMas && !cargando && <p className="fin-lista">No hay más productos</p>}
    </div>
  );
}

export default Inicio;
