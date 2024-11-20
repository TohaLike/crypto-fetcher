"use client";
import React from "react";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useRoom } from "@/hooks/useRoom";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { socket } from "@/socket/socket";
import { useParams } from "next/navigation";

export const ProfilePage: React.FC = () => {
  const { userData, isAuthorized } = useAuthorized();

  const router = useRouter();
  const params = useParams();

  const { profileData } = useProfile({ params: params?.profile });

  const redirectToRoom = () => {
    router.push(`/messages/user?res=${params?.profile}`);
    socket.emit("join__room", params?.profile);
    return;
  };

  return (
    <>
      {userData?.id === params?.profile && (
        <div>
          <h2>Имя: {profileData?.name}</h2>
          <p>Создан: {profileData?.createdAt}</p>
          <p>Почта: {profileData?.email}</p>
          <p>Авторизован: {isAuthorized ? "Да" : "Нет"}</p>
        </div>
      )}

      {userData?.id !== params?.profile && (
        <div>
          <h2>Имя: {profileData?.name}</h2>
          <p>Создан: {profileData?.createdAt}</p>
          <p>Почта: {profileData?.email}</p>

          <button onClick={redirectToRoom}>Начать беседу</button>
        </div>
      )}
    </>
  );
};
