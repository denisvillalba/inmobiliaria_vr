import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerDepartamentos } from "../api/departamentosService";
import { obtenerVisitas, obtenerUsuarios } from "../api/visitasService";
import { useAuth } from "../contexts/AuthContext";

function DashboardVisitas() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [visitas, setVisitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [dataVisitas, dataUsuarios, dataDepartamentos] = await Promise.all([
          obtenerVisitas(),
          obtenerUsuarios(),
          obtenerDepartamentos(),
        ]);

        setVisitas(dataVisitas);
        setUsuarios(dataUsuarios);
        setDepartamentos(dataDepartamentos);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (user?.rol !== "admin") {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Acceso no permitido</h2>
        <p className="text-center text-gray-700 mb-4">
          Solo el administrador puede ver este dashboard.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
        >
          Volver
        </button>
      </div>
    );
  }

  const obtenerNombreUsuario = (usuarioId) => {
    const usuario = usuarios.find((u) => u.id === usuarioId);
    return usuario ? usuario.nombre : "Usuario no encontrado";
  };

  const obtenerNombreDepartamento = (departamentoId) => {
    const departamento = departamentos.find((d) => d.id === departamentoId);
    return departamento ? departamento.titulo : "Departamento no encontrado";
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Cargando dashboard...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Dashboard de Visitas Programadas
      </h2>

      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Departamento</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Hora</th>
              <th className="border p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id}>
                <td className="border p-2 text-center">
                  {obtenerNombreUsuario(visita.usuarioId)}
                </td>
                <td className="border p-2 text-center">
                  {obtenerNombreDepartamento(visita.departamentoId)}
                </td>
                <td className="border p-2 text-center">{visita.fecha}</td>
                <td className="border p-2 text-center">{visita.hora}</td>
                <td className="border p-2 text-center">{visita.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Volver
      </button>
    </div>
  );
}

export default DashboardVisitas;