import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Trigger risk calculation
export const calculateRisk = (projectId) => {
  return api.post(`/risk/${projectId}`);
};

// Fetch stored risk result
export const getRisk = (projectId) => {
  return api.get(`/risk/${projectId}`);
};

export default api;
