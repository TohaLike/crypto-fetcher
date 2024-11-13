"use client";
import React from "react";
import { useRooms } from "@/hooks/useRooms";
import { ChatRoom } from "@/components/ui";

export default function MessagesPage() {
  const { rooms } = useRooms();

  const sortedChatRooms = rooms?.sort((a, b) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  console.log(rooms?.map(e => e));

  return (
    <>
      {sortedChatRooms?.map((room, index) => (
        <ChatRoom
          key={"room: " + index}
          name={room.usersId[0].name}
          latestMessage={room.lastMessage}
          roomID={room.usersId[0]._id}
        />
      ))}
    </>
  );
}
