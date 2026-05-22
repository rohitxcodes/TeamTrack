import { io as clientIo } from "socket.io-client";

const DEFAULT_PROD_API_URL = "https://teamtrack-kt9w.onrender.com/api";

const BACKEND =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : import.meta.env.PROD
      ? DEFAULT_PROD_API_URL.replace(/\/api\/?$/, "")
      : "http://localhost:5000");

const socket = clientIo(BACKEND, {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
