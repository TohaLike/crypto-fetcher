"use client";
import React, { useContext, useEffect, useState } from "react";
import roomspage from "./roomspage.module.scss";
import { useRooms } from "@/hooks/useRooms";
import { ChatRoom } from "@/components/ui";
import { socket } from "@/socket";
import { LinkButton } from "@/components/ui/LinkButton/LinkButton";
import { SocketContext } from "@/app/(home)/provider";
import { ProfileItemsSkeleton } from "@/components/skeletons";

export default function MessagesPage() {
  const { isConnected, transport } = useContext<any>(SocketContext);

  const [lastMessage, setLastMessage] = useState<any[]>([]);

  const { rooms, loadingRooms } = useRooms();

  useEffect(() => {
    socket.on("room__message", (name, message, id, updatedAt, usersId) => {
      setLastMessage([
        ...lastMessage,
        { name, lastMessage: { messageText: message, updatedAt }, id, usersId },
      ]);
    });

    return () => {
      socket.off("room__message");
    };
  }, [socket, isConnected, lastMessage, rooms]);

  const concatRooms = rooms?.concat(lastMessage);
  const messagesRooms = Array.from(new Map(concatRooms?.map((item) => [item?.id, item])).values());

  const sortedChatRooms = messagesRooms?.sort((a, b) => {
    const dateA = new Date(a?.lastMessage?.updatedAt);
    const dateB = new Date(b?.lastMessage?.updatedAt);
    return dateB?.getTime() - dateA?.getTime();
  });

  if (loadingRooms) return <ProfileItemsSkeleton />;

  if (sortedChatRooms.length <= 0)
    return (
      <div className={roomspage.container__nomessages}>
        <LinkButton title="Start a conversation" href="/peoples" bgcolor="transparent" />
      </div>
    );

  return (
    <>
      <div className={roomspage.container}>
        {sortedChatRooms?.map((room, index) => (
          <ChatRoom
            key={"room: " + index}
            name={room.usersId[0]?.name}
            latestMessage={room.lastMessage?.messageText}
            roomID={room.usersId[0]?._id}
            options={room.usersId[0]?.options}
            createdAt={room?.lastMessage?.updatedAt}
          />
        ))}
      </div>
    </>
  );
}
