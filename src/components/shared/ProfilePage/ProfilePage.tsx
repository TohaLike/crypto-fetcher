"use client";
import React from "react";
import { useAuthorized } from "@/hooks/useAuthorized";

export const ProfilePage: React.FC = () => {
  const { userData, isAuthorized } = useAuthorized();
  
  console.log(userData);

  return (
    <>
      <h2>{userData?.name}</h2>
      <p>{userData?.createdAt}</p>
      <p>{userData?.email}</p>
      <p>{isAuthorized}</p>
    </>
  );
};
