"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [connect, setConnect] = useState<boolean>(false);

  const { userData, isLoading } = useAuthorized();

  useEffect(() => {
    socket.connect();

    socket.emit("join__rooms");

    socket.on("connection", (data: any) => {
      setConnect(true);
      console.log(data, "!");
    });

    return () => {
      socket.disconnect();
      socket.off("join__rooms");
    };
  }, [socket]);

  return (
    <>
      <div>{userData && children}</div>
    </>
  );
};
