"use client";
import React, { useContext, useEffect, useState } from "react";
import roomspage from "./roomspage.module.scss";
import { useRooms } from "@/hooks/useRooms";
import { ChatRoom } from "@/components/ui";
import { socket } from "@/socket";
import { Box, Typography } from "@mui/material";
import { LinkButton } from "@/components/ui/LinkButton/LinkButton";
import { SocketContext } from "@/app/(home)/provider";

export default function MessagesPage() {
  const { isConnected, transport } = useContext<any>(SocketContext);

  const [lastMessage, setLastMessage] = useState<any[]>([]);

  const { rooms } = useRooms();

  useEffect(() => {
    if (isConnected)
      socket.on("room__message", (name, message, id, createdAt, usersId) => {
        setLastMessage([
          ...lastMessage,
          { name, lastMessage: { messageText: message, createdAt }, id, usersId },
        ]);
      });

    return () => {
      socket.off("room__message");
    };
  }, [socket, isConnected, lastMessage, rooms]);

  const concatRooms = rooms?.concat(lastMessage);
  const messagesRooms = Array.from(new Map(concatRooms?.map((item) => [item?.id, item])).values());

  const sortedChatRooms = messagesRooms?.sort((a, b) => {
    const dateA = new Date(a?.lastMessage?.createdAt);
    const dateB = new Date(b?.lastMessage?.createdAt);
    return dateB?.getTime() - dateA?.getTime();
  });

  return (
    <>
      <div className={roomspage.container}>
        {sortedChatRooms?.map((room, index) => (
          <ChatRoom
            key={"room: " + index}
            name={room.usersId[0].name}
            latestMessage={room.lastMessage?.messageText}
            roomID={room.usersId[0]._id}
          />
        ))}
      </div>
    </>
  );
}
