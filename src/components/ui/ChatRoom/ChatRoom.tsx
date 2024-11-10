"use client";
import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { socket } from "@/socket/socket";

interface Props {
  name: string;
  latestMessage: string;
  roomID: string;
}

export const ChatRoom: React.FC<Props> = ({ name, latestMessage, roomID }) => {
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
          <Avatar sx={{ bgcolor: "green" }}>{name[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <Typography variant="body2" style={{ color: "#FFFFFF" }}>
              {latestMessage}
            </Typography>
          }
        />
      </ListItem>
    </>
  );
};
