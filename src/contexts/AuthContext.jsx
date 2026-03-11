import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";   // usamos tu cliente axios

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // cargar sesión guardada
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);

  // LOGIN usando API real
  const login = async (correo, password) => {

    try {

      const response = await api.get("/usuarios", {
        params: { correo, password }
      });

      const usuarios = response.data;

      if (!usuarios.length) {
        throw new Error("Credenciales incorrectas");
      }

      const usuario = usuarios[0];

      setUser(usuario);
      localStorage.setItem("user", JSON.stringify(usuario));

      return true;

    } catch (error) {

      console.error("Error en login:", error);
      return false;

    }

  };

  // LOGOUT
  const logout = () => {

    setUser(null);
    localStorage.removeItem("user");

  };

  return (

    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>

  );

}

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }

  return context;

};