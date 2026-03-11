// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://9f51f3ea47b3b7cd.mokky.dev',  // ← tu instancia de Mokky (sin /api al final)
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor REQUEST → agrega token si existe (descomenta cuando implementes JWT o auth real)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor RESPONSE → maneja 401 (token inválido) → logout automático
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login';  // simple
      // Mejor: redirige con router si tienes acceso (puedes mover esto a AuthContext)
    }
    return Promise.reject(error);
  }
);

export default api;