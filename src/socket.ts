"use client";
import { io } from "socket.io-client";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  transports: ["websocket", "polling"],
  auth: { token: token },
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  rememberUpgrade: true,
});
