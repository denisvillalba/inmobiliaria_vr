import api from "./api";

export const registrarVisita = async (data) => {
  const response = await api.post("/visitas", data);
  return response.data;
};

export const obtenerVisitas = async () => {
  const response = await api.get("/visitas");
  return response.data;
};

export const obtenerUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const obtenerDepartamentos = async () => {
  const response = await api.get("/departamentos");
  return response.data;
};