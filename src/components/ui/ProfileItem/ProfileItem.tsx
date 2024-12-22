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
import { ActionButton } from "../ActionButton/ActionButton";
import { MessageRoomIcon } from "@/components/icons/MessageRoomIcon";

interface Props {
  name: string;
  userID: string;
  options?: any;
}

export const ProfileItem: React.FC<Props> = ({ name, userID, options }) => {
  const router = useRouter();

  const redirectToUserProfile = (event: any) => {
    event.stopPropagation();
    router.push(`/${userID}`);
    return;
  };

  const redirectToChat = (event: any) => {
    event.stopPropagation();
    router.push(`/messages/user?res=${userID}`);
    return;
  };

  console.log(options);

  return (
    <>
      <ListItem onClick={redirectToUserProfile} sx={{ cursor: "pointer" }}>
        <ListItemAvatar>
          {options?.image ? (
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0].path}`}
              alt="avatar"
              width={54}
              height={54}
              style={{ objectFit: "cover", borderRadius: "50%", marginRight: "15px" }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: `#${options?.defaultColor ? options?.defaultColor : "1976d2"}`,
                height: "54px",
                width: "54px",
                mr: "15px",
                fontSize: "24px",
              }}
            >
              {name[0].toUpperCase()}
            </Avatar>
          )}
        </ListItemAvatar>{" "}
        <Box sx={{ display: "grid", gridTemplateColumns: "auto" }}>
          <ListItemText
            primary={
              <Typography
                variant="inherit"
                style={{ color: "#FFFFFF", fontSize: "18px" }}
                textTransform={"capitalize"}
              >
                {name}
              </Typography>
            }
            secondary={
              <ActionButton
                display="flex"
                columnGap="3px"
                icon={<MessageRoomIcon width={"16px"} height={"16px"} color={"#00EAFF"} />}
                title={
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#00EAFF",
                      fontSize: "14px",
                      fontWeight: "100",
                      fontStyle: "italic",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Send message
                  </Typography>
                }
                bgcolor="transparent"
                type="button"
                onClick={redirectToChat}
              />
            }
          />
        </Box>
      </ListItem>
      <Divider variant="middle" sx={{ "&.MuiDivider-root": { bgcolor: "#282828" } }} />
    </>
  );
};
