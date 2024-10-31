"use client";
import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { socket } from "@/socket/socket";

interface Props {
  name: string;
  date: string;
  roomID: string;
}

export const ChatRoom: React.FC<Props> = ({ name, date, roomID }) => {
  const router = useRouter();

  const redirectToRoom = () => {
    router.push(`/messages/user?res=${roomID}`);
    socket.emit("join__room", roomID);
    return;
  };

  return (
    <>
      <ListItem onClick={redirectToRoom}>
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={date} />
      </ListItem>
    </>
  );
};
