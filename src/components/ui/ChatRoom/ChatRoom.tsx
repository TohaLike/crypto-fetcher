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
  options?: any;
}

export const ChatRoom: React.FC<Props> = ({ name, latestMessage, roomID, options }) => {
  const router = useRouter();

  const redirectToRoom = () => {
    router.push(`/messages/user?res=${roomID}`);
    socket.emit("join__room", roomID);
    return;
  };

  return (
    <>
      <ListItem
        onClick={redirectToRoom}
        sx={{
          cursor: "pointer",
          borderBottom: "1px solid #282828",
          width: "auto",
          height: "73px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ListItemAvatar sx={{ display: "flex", alignItems: "center" }}>
            {options?.image?.length <= 0 ? (
              <Avatar
                sx={{
                  bgcolor: `#${options?.defaultColor ? options?.defaultColor : "1976d2"}`,
                  height: "54px",
                  width: "54px",
                  mr: "15px",
                  fontSize: "24px",
                }}
              >
                {name[0]?.toUpperCase()}
              </Avatar>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
                alt="avatar"
                width={54}
                height={54}
                style={{ objectFit: "cover", borderRadius: "50%", marginRight: "15px" }}
              />
            )}
          </ListItemAvatar>
          <Box sx={{ display: "grid", gridTemplateColumns: "auto" }}>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  style={{ color: "#FFFFFF" }}
                  textTransform={"capitalize"}
                >
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
        </Box>
      </ListItem>
    </>
  );
};
