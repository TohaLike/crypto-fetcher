// import { useAuthorized } from "@/hooks/useAuthorized";
import { io } from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";
// const { token } = useAuthorized();


export const socket = io(URL, {
  transports: ["websocket", "polling"],
  auth: { token: localStorage.getItem("token") },
  withCredentials: true,
  ackTimeout: 10000,
  // retries: 3,
  // reconnectionDelay: 10000,
  // reconnectionDelayMax: 10000,
});
