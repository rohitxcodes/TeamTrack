import axios from "axios";

const AUTH_TOKEN_KEY = "teamtrack_auth_token";
const DEFAULT_PROD_API_URL = "https://teamtrack-kt9w.onrender.com/api";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? DEFAULT_PROD_API_URL : "http://localhost:5000/api");

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;

export { AUTH_TOKEN_KEY };
