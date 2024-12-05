"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [connect, setConnect] = useState<boolean>(false);

  const { userData, isLoading } = useAuthorized();

  useEffect(() => {
    // Подключение
    socket.on("connect", () => {
      console.log("recovered?", socket.recovered);

      // setTimeout(() => {
      //   if (socket.io.engine) {
      //     // close the low-level connection and trigger a reconnection
      //     socket.io.engine.close();
      //   }
      // }, 10000);

      socket.emit("join__rooms");
    });

    // Отключение
    socket.on("disconnect", (reason) => {
      console.log("Disconnected from server:", reason);
      console.log("Reconnecting...", socket.connected);

      if (!socket.connected) setConnect(true);
    });

    // Попытка переподключения
    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`Reconnect attempt #${attemptNumber}`);
    });

    // Успешное переподключение
    socket.on("reconnect", (attemptNumber) => {
      console.log(`Successfully reconnected after ${attemptNumber} attempts`);
    });

    // Ошибка переподключения
    socket.on("reconnect_error", (error) => {
      console.error("Reconnect error:", error);
    });

    // Неудачное переподключение
    socket.on("reconnect_failed", () => {
      console.error("Failed to reconnect after all attempts");
    });

    return () => {
      // Удаляем обработчики при размонтировании компонента
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnect_attempt");
      socket.off("reconnect");
      socket.off("reconnect_error");
      socket.off("reconnect_failed");
    };
  }, [connect]);

  return (
    <>
      <div>{userData && children}</div>
    </>
  );
};
