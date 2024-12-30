"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useLogout } from "@/hooks/useLogout";
import { socket } from "@/socket";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface Props {
  isConnected: boolean;
  transport: string;
  userData: any;
}

export const SocketContext = createContext<Props | null>(null);

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userData, isLoading } = useAuthorized();

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const { logoutTrigger } = useLogout();

  const router = useRouter();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.emit("join__rooms");

      console.log("onConnect");

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const redirect = async () => {
    await logoutTrigger().then(() => {
      window.location.replace("/");
    });
  };

  if (!userData) {
    return (
      <Box
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <Button variant="contained" onClick={redirect}>Login</Button>
      </Box>
    );
  }

  if (isLoading) {
    return "loading"
  }

  return (
    <>
      <SocketContext.Provider value={{ isConnected, transport, userData }}>
        {userData && children}
      </SocketContext.Provider>
    </>
  );
};
