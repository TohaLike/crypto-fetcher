import { useAuthorized } from "@/hooks/useAuthorized";
import { io } from "socket.io-client";


const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const useSocket = () => {
  const { token } = useAuthorized();

  const socket = io(URL, {
    transports: ["websocket", "polling"],
    auth: { token: "token" },
    withCredentials: true,
    ackTimeout: 10000,
    // retries: 3,
    // reconnectionDelay: 10000,
    // reconnectionDelayMax: 10000,
  });

  return {
    socket,
  };
};
