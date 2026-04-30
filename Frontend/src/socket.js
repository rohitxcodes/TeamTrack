import { io as clientIo } from "socket.io-client";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const socket = clientIo(BACKEND, {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
