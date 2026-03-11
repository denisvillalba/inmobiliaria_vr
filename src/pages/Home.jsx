// src/pages/Home.jsx
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="p-8">
      {user ? (
        <>
          <h1>Bienvenido, {user.name || user.email}</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>Por favor inicia sesión</p>
      )}
    </div>
  )
}