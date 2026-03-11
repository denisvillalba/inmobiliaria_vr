import { useState } from "react";
import CatalogoDepartamentos from "./components/CatalogoDepartamentos";
import FormularioVisita from "./components/FormularioVisita";
import DashboardVisitas from "./components/DashboardVisitas";
import casa from "./assets/inmobiliaria.jpg";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";

function App() {

  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [departamentos, setDepartamentos] = useState([]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Cargando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />

        <Route
          path="/"
          element={
            user ? (
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-4">
                  Bienvenido, {user.nombre || user.correo}
                </h1>

                <p className="text-green-700 mb-6 text-xl">
                  Estás logueado como {user.rol?.toUpperCase() || "usuario"}
                </p>

              <div className="flex gap-4 justify-center mb-6">

                {user?.rol === "admin" && (
                  <button
                    onClick={() => navigate("/visitas")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Ver visitas programadas
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cerrar sesión
                </button>

              </div>

                <CatalogoDepartamentos />
              </div>
            ) : (
              <div className="w-full text-center text-gray-600">
                <h1 className="text-3xl font-bold mb-8">Inmobiliaria VR</h1>

                <img
                  src={casa}
                  alt="Inmobiliaria"
                  className="mx-auto mb-6 w-[450px] rounded-xl shadow-lg"
                />

                <p className="text-xl mb-4">
                  Observa nuestro catálogo de ofertas
                </p>

                <p>
                  Ingresa{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    al login
                  </Link>{" "}
                  para ver
                </p>
              </div>
            )
          }
        />

        <Route
          path="/visita/:id"
          element={
            user ? <FormularioVisita /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/visitas"
          element={user ? <DashboardVisitas /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;