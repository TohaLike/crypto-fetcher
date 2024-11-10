import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const socket = io("https://crypto-fetcher-back-r53h8ork9-antons-projects-5f3e0d01.vercel.app", {
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
