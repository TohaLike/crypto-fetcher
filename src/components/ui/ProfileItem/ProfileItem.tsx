"use client";
import React, { useContext, useState } from "react";
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
import { SocketContext } from "@/app/(home)/provider";
import { useSubscribe } from "@/hooks/useSubscribe";
import Image from "next/image";
import { useSubscribeNews } from "@/hooks/useSubscribeNews";

interface Props {
  name: string;
  userID: string;
  options?: any;
  subscribers: any;
}

function ComponentButton({
  title,
  onClick,
  disabled,
}: {
  onClick: (value: any) => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <ActionButton
      type="button"
      title={title || "title"}
      size="small"
      borderRadius={"16px"}
      bgcolor="#fff"
      color="#000"
      padding={"0 10px"}
      fontWeight={400}
      border
      onClick={onClick}
      disabled={disabled}
    />
  );
}

function AddFriendButton({
  onClick,
  checkSubscribe,
  sub,
}: {
  onClick: (value: any) => void;
  checkSubscribe: any;
  sub: boolean;
}) {
  if (checkSubscribe?.length <= 0 && !sub)
    return <ComponentButton title="Follow" onClick={onClick} />;

  return <ComponentButton title="Fllowing" onClick={onClick} disabled={true} />;
}

export const ProfileItem: React.FC<Props> = ({ name, userID, options, subscribers }) => {
  const { userData } = useContext<any>(SocketContext);
  const { triggerSubscribe, subscribeData, mutatingSubscribe } = useSubscribe();
  const { triggerNews, dataNews, mutatingNews } = useSubscribeNews();
  const [sub, setSub] = useState<boolean>(false);
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

  const addFriend = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    await triggerSubscribe({
      userId: userID,
    }).then((e) => {
      setSub(true);
    });
    await triggerNews({
      userId: userID,
    });
    return;
  };
  
  return (
    <>
      <ListItem
        onClick={redirectToUserProfile}
        sx={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ListItemAvatar>
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
                {name[0].toUpperCase()}
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
        </Box>

        {userData?.id !== userID && (
          <AddFriendButton
            onClick={addFriend}
            checkSubscribe={subscribers?.subscribers}
            sub={sub}
          />
        )}
      </ListItem>
      <Divider variant="middle" sx={{ "&.MuiDivider-root": { bgcolor: "#282828" } }} />
    </>
  );
};
