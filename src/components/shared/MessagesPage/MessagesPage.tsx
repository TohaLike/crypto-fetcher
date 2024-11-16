"use client";
import React, { useEffect, useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import { ChatRoom } from "@/components/ui";
import { socket } from "@/socket/socket";

export default function MessagesPage() {
  const [lastMessage, setLastMessage] = useState<any[]>([]);
  const { rooms } = useRooms();

  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));

    socket.emit("join__rooms");

    socket.on("room__message", (name, message, id, createdAt) => {
      setLastMessage([
        ...lastMessage,
        { name, lastMessage: { messageText: message }, id, createdAt },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("room__message");
      socket.off("join__rooms");
    };
  }, [socket, lastMessage, rooms]);

  const concatRooms = rooms?.concat(lastMessage);
  const messagesRooms = Array.from(new Map(concatRooms?.map((item) => [item?.id, item])).values());

  const sortedChatRooms = messagesRooms?.sort((a, b) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  console.log(concatRooms);

  return (
    <>
      {sortedChatRooms?.map((room, index) => (
        <ChatRoom
          key={"room: " + index}
          name={room.name}
          latestMessage={room.lastMessage?.messageText}
          roomID={room.id}
        />
      ))}
    </>
  );
}
