"use client";
import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";

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
      <ListItem onClick={redirectToRoom} sx={{ cursor: "pointer" }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#1976d2" }}>{name[0].toUpperCase()}</Avatar>
        </ListItemAvatar>{" "}
        <Box sx={{ display: "grid", gridTemplateColumns: "auto" }}>
          <ListItemText
            primary={
              <Typography variant="body1" style={{ color: "#FFFFFF" }} textTransform={"capitalize"}>
                {name}
              </Typography>
            }
            secondary={
              <Typography
                variant="body2"
                style={{
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "500px",
                }}
              >
                {latestMessage}
              </Typography>
            }
          />{" "}
        </Box>
      </ListItem>
      <Divider variant="middle" sx={{ "&.MuiDivider-root": { bgcolor: "#282828" } }} />
    </>
  );
};
