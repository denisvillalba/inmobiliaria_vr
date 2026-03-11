// src/components/ProtectedRoute.jsx
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <div>Cargando...</div>

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />   // renderiza las rutas hijas
}