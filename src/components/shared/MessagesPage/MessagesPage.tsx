"use client";
import React from "react";
import { useRooms } from "@/hooks/useRooms";
import { ChatRoom } from "@/components/ui";

export default function MessagesPage() {
  const { rooms } = useRooms();

  console.log(rooms);
  

  return (
    <>
      {rooms?.map((room, index) => (
        <ChatRoom
          key={"room: " + index}
          name={room.name + index}
          date={room.createdAt}
          roomID={room.roomId}
        />
      ))}
    </>
  );
}
