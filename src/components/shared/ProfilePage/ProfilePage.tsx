"use client";
import React from "react";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useRoom } from "@/hooks/useRoom";

export const ProfilePage: React.FC = () => {
  const { userData, isAuthorized } = useAuthorized();
  const { roomTrigger } = useRoom();

  return (
    <>
      <h2>{userData?.name}</h2>
      <p>{userData?.createdAt}</p>
      <p>{userData?.email}</p>
      <p>{isAuthorized}</p>

      <button onClick={async () => await roomTrigger({name: userData?.name + " room", userId: userData?.id})}>Add room</button>
    </>
  );
};
