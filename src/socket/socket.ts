import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

console.log(process.env.SERVER_URL)

export const socket = io(process.env.SERVER_URL, {
  transports: ["websocket", "polling"],
  auth: { token: token },
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  secure: true,
  // rejectUnauthorized: false,
});
