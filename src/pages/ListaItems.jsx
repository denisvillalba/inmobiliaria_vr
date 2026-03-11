// src/pages/ListaItems.jsx   ← renombra el archivo si quieres
import axios from 'axios';
import { useEffect, useState } from 'react';

const ListaItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        setItems(response.data.results);
      } catch (error) {
        console.error('Error al cargar los items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div className="text-center text-2xl mt-10">Cargando...</div>;

 return (
  <div className="bg-white min-h-screen p-10">
    {/* Parte de prueba (puedes quitarla después) */}
    <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
      ESTO DEBE VERSE → PRUEBA DE VISIBILIDAD
    </h1>
    
    <p className="text-center text-xl mb-6">
      Cantidad cargada: {items.length} elementos
    </p>

    {/* Aquí están los 100 elementos → grilla con tarjetas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center border border-gray-200"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            alt={item.name}
            className="w-32 h-32 object-contain"
          />
          <h2 className="text-lg font-bold capitalize mt-3 text-gray-800">
            {item.name}
          </h2>
        </div>
      ))}
    </div>
  </div>
);

};

export default ListaItems;