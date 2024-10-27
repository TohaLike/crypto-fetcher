"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useRooms } from "@/hooks/useRooms";
import SocketService from "@/services/SocketService";
import React, { useEffect } from "react";
import { mutate } from "swr";

export default function MessagesPage() {
  const { userData } = useAuthorized();
  const { rooms, mutateRooms } = useRooms();

  return (
    <>
      <div>MessagesPage</div>
    </>
  );
}
