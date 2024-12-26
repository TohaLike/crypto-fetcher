"use client";
import React, { useContext } from "react";
import addfrienditem from "./addfrienditem.module.scss";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ActionButton } from "../ActionButton/ActionButton";
import { MessageRoomIcon } from "@/components/icons/MessageRoomIcon";
import { SocketContext } from "@/app/(home)/provider";
import { useSubscribe } from "@/hooks/useSubscribe";

interface Props {
  name: string;
  userID: string;
  options?: any;
}

function AddFriendButton() {
  return <ActionButton type="button" title="Sub" size="small" borderRadius={"16px"} border />;
}

export const AddFriendItem: React.FC<Props> = ({ name, userID, options }) => {
  const { userData } = useContext<any>(SocketContext);
  const { triggerSubscribe, subscribeData, mutatingSubscribe } = useSubscribe();
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

  const addFriend = () => {
    return;
  };

  return (
    <>
      <ListItem
        onClick={redirectToUserProfile}
        sx={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
      >
        <div className={addfrienditem.container}>
          <ListItemAvatar>
            {options?.image.length > 0 ? (
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
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
        </div>
        {userData?.id !== userID && <AddFriendButton />}
      </ListItem>
      <Divider variant="middle" sx={{ "&.MuiDivider-root": { bgcolor: "#282828" } }} />
    </>
  );
};
