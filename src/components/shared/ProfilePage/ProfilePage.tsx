"use client";
import React from "react";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useRoom } from "@/hooks/useRoom";

export const ProfilePage: React.FC = () => {
  const { userData, isAuthorized } = useAuthorized();
  const { roomTrigger } = useRoom();

  return (
    <>
      <div>
        <h2>Имя: {userData?.name}</h2>
        <p>Создан: {userData?.createdAt}</p>
        <p>Почта: {userData?.email}</p>
        <p>Авторизован: {isAuthorized ? "Да" : "Нет"}</p>

        <button
          onClick={async () =>
            await roomTrigger({ name: userData?.name + " room", ownerId: userData?.id, userId: "671feddeea39df9953f41b4b" })
          }
        >
          Add room
        </button>
      </div>
    </>
  );
};
