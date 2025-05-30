import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  config.headers["X-Tenant-Id"] = "demo-tenant";
  return config;
});

export default api;
