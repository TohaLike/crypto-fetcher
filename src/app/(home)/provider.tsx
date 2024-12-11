"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket";
import { createContext, useEffect, useState } from "react";

interface Props {
  isConnected: boolean;
  transport: string;
}

export const SocketContext = createContext<Props | null>(null);

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userData, isLoading } = useAuthorized();

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
      socket.emit("join__rooms");
    }

    function onConnect() {
      setIsConnected(true);

      setTransport(socket.io.engine.transport.name);

      console.log("onConnect");
      socket.emit("join__rooms");

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
        socket.emit("join__rooms");
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    //sca

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <SocketContext.Provider value={{ isConnected, transport }}>
        {userData && children}
      </SocketContext.Provider>
    </>
  );
};
