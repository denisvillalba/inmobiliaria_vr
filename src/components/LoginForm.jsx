// components/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(''); // error local adicional (opcional)

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); // limpia error local

    // Validación básica extra antes de llamar al contexto
    if (!correo.includes('@')) {
      setFormError('Ingresa un correo válido');
      return;
    }

    const success = await login(correo.trim(), password);

    if (success) {
      navigate('/', { replace: true }); // redirige a home o dashboard
    } else {
      setFormError('Credenciales inválidas'); // opcional: mensaje más amigable
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition  bg-white"
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 text-white font-medium rounded-lg transition-colors ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800 active:bg-blue-900'
          }`}
        >
          {loading ? 'Iniciando sesión...' : 'Ingresar'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta? 
          <a href="/registro" className="text-blue-600 hover:underline ml-1">
            Crear cuenta
          </a>
         
        </p>

        {(error || formError) && (
          <p className="text-red-600 text-center text-sm mt-4">
            {error || formError}
          </p>
        )}
      </form>
       <p className="mt-4 text-center text-gray-400">@Inmobiliaria VR</p>
    </div>
    
  );
}