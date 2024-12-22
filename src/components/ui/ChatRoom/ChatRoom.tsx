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
import Image from "next/image";

interface Props {
  name: string;
  latestMessage: string;
  roomID: string;
  image?: any;
}

export const ChatRoom: React.FC<Props> = ({ name, latestMessage, roomID, image }) => {
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
          {image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image[0].path}`}
              alt="avatar"
              width={50}
              height={50}
              draggable={false}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          ) : (
            <Avatar sx={{ bgcolor: "#1976d2", width: "50px", height: "50px" }}>
              {name && name[0]?.toUpperCase()}
            </Avatar>
          )}
        </ListItemAvatar>
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
          />
        </Box>
      </ListItem>
      <Divider variant="middle" sx={{ "&.MuiDivider-root": { bgcolor: "#282828" } }} />
    </>
  );
};
