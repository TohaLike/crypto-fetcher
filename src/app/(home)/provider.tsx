"use client";
import { useEffect, useState } from "react";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket/socket";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userData } = useAuthorized();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });

    return() => {
      socket.off("connect");
    }
  }, []);

  return (
    <>
      <div>{userData && children}</div>
    </>
  );
};
