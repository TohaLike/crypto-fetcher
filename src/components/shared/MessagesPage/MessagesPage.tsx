"use client";
import React from "react";
import { useRooms } from "@/hooks/useRooms";
import { ChatRoom } from "@/components/ui";

export default function MessagesPage() {
  const { rooms } = useRooms();

  const sortedChatRooms = rooms?.sort((a, b) => {
    const dateA = new Date(a?.lastMessage.createdAt);
    const dateB = new Date(b?.lastMessage.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  // console.log(rooms?.map(e => e.roomId));

  return (
    <>
      {sortedChatRooms?.map((room, index) => (
        <ChatRoom
          key={"room: " + index}
          name={room.companion.name}
          latestMessage={room.lastMessage.message}
          roomID={room.roomId}
        />
      ))}
    </>
  );
}
