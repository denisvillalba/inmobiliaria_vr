import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registrarVisita } from "../api/visitasService";
import { useAuth } from "../contexts/AuthContext";

function FormularioVisita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");

  if (user?.rol === "admin") {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Acceso no permitido</h2>
        <p className="text-center text-gray-700 mb-4">
          El administrador no puede programar visitas.
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevaVisita = {
        usuarioId: user.id,
        departamentoId: Number(id),
        fecha,
        hora,
        estado: "pendiente",
      };

      await registrarVisita(nuevaVisita);
      setMensaje("Visita registrada correctamente");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Error al registrar visita:", error);
      setMensaje("Error al registrar visita");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Programar visita
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hora</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Guardar visita
        </button>
      </form>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-3 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
      >
        Ir al catálogo
      </button>

      {mensaje && (
        <p className="text-center mt-4 text-green-700">{mensaje}</p>
      )}
    </div>
  );
}

export default FormularioVisita;