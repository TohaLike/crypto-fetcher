"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import React, { use } from "react";

export const ProfilePage: React.FC = () => {
  const { userData, isAuthorized } = useAuthorized();

  console.log(userData)

  return (
    <>
      <h2>{userData?.name}</h2>
    </>
  );
};
