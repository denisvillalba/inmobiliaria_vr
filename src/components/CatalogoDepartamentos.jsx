import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { obtenerDepartamentos } from "../api/departamentosService";

function CatalogoDepartamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [precioMaximo, setPrecioMaximo] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const cargarDepartamentos = async () => {
      try {
        const data = await obtenerDepartamentos();
        setDepartamentos(data);
      } catch (error) {
        console.error("Error cargando departamentos", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDepartamentos();
  }, []);

  const departamentosFiltrados = useMemo(() => {
    if (!precioMaximo) return departamentos;

    return departamentos.filter(
      (dep) => Number(dep.precio) <= Number(precioMaximo)
    );
  }, [departamentos, precioMaximo]);

  if (loading) {
    return (
      <p className="text-center text-xl">
        Cargando catálogo...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Catálogo de Departamentos
      </h2>

      <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-72">
          <label className="block text-sm font-medium mb-1">
            Filtrar por precio máximo
          </label>
          <input
            type="number"
            value={precioMaximo}
            onChange={(e) => setPrecioMaximo(e.target.value)}
            placeholder="Ejemplo: 200000"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          onClick={() => setPrecioMaximo("")}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Limpiar filtro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departamentosFiltrados.map((dep) => (
          <div
            key={dep.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={dep.imagen || "https://via.placeholder.com/600x400?text=Sin+imagen"}
              alt={dep.nombre}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                {dep.nombre}
              </h3>

              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Ubicación:</span> {dep.distrito}
              </p>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Precio:</span> S/ {dep.precio}
              </p>

              <p className="text-gray-600 mt-2 mb-4">
                {dep.caracteristicas}
              </p>

             {user?.rol === "cliente" && (
                <button
                  onClick={() => navigate(`/visita/${dep.id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Programar visita
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {departamentosFiltrados.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No hay departamentos dentro de ese rango de precio.
        </p>
      )}
    </div>
  );
}

export default CatalogoDepartamentos;